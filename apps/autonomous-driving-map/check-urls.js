// URLチェックスクリプト（Phase 2）
// reference-urls.jsonのURLを検証する

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urlsPath = path.join(__dirname, 'research', 'reference-urls.json');
const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

const CONCURRENCY = 5;
const TIMEOUT_MS = 10000;

async function checkUrl(entry) {
  return new Promise((resolve) => {
    const { expId, refId, url, title } = entry;
    if (!url || !url.startsWith('http')) {
      resolve({ expId, refId, url, title, status: 'INVALID_URL', error: 'not http(s)' });
      return;
    }

    const lib = url.startsWith('https') ? https : http;
    const reqOptions = {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; reference-checker/1.0)',
        'Accept': '*/*'
      },
      timeout: TIMEOUT_MS,
    };

    let resolved = false;
    const done = (result) => {
      if (!resolved) { resolved = true; resolve(result); }
    };

    try {
      const req = lib.request(url, reqOptions, (res) => {
        done({ expId, refId, url, title, status: res.statusCode, redirect: res.headers.location });
      });
      req.on('timeout', () => { req.destroy(); done({ expId, refId, url, title, status: 'TIMEOUT' }); });
      req.on('error', (e) => { done({ expId, refId, url, title, status: 'ERROR', error: e.message }); });
      req.end();
    } catch (e) {
      done({ expId, refId, url, title, status: 'ERROR', error: e.message });
    }
  });
}

async function runWithConcurrency(tasks, concurrency) {
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      const result = await tasks[i]();
      results[i] = result;
      process.stdout.write(`\r${i + 1}/${tasks.length} チェック済み...`);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  process.stdout.write('\n');
  return results;
}

(async () => {
  console.log(`=== Phase 2: URLチェック (${urls.length}件) ===\n`);

  const tasks = urls.map(entry => () => checkUrl(entry));
  const results = await runWithConcurrency(tasks, CONCURRENCY);

  // 問題分類
  const ok = results.filter(r => r.status === 200 || r.status === 206);
  const redirects = results.filter(r => r.status === 301 || r.status === 302 || r.status === 307 || r.status === 308);
  const notFound = results.filter(r => r.status === 404 || r.status === 410);
  const errors = results.filter(r => r.status === 'ERROR' || r.status === 'TIMEOUT' || r.status === 'INVALID_URL');
  const other = results.filter(r => !ok.includes(r) && !redirects.includes(r) && !notFound.includes(r) && !errors.includes(r));

  console.log(`✓ OK (2xx):        ${ok.length}件`);
  console.log(`→ リダイレクト:    ${redirects.length}件`);
  console.log(`✗ Not Found (404): ${notFound.length}件`);
  console.log(`✗ エラー/タイムアウト: ${errors.length}件`);
  console.log(`? その他:          ${other.length}件`);

  // 詳細出力
  if (notFound.length > 0) {
    console.log('\n【404 / 削除済み】');
    for (const r of notFound) {
      console.log(`  ${r.expId} ref${r.refId}: [${r.status}] ${r.url}`);
      console.log(`    "${r.title}"`);
    }
  }

  if (errors.length > 0) {
    console.log('\n【エラー/タイムアウト】');
    for (const r of errors) {
      console.log(`  ${r.expId} ref${r.refId}: [${r.status}] ${r.url}`);
      if (r.error) console.log(`    エラー: ${r.error}`);
    }
  }

  if (redirects.length > 0) {
    console.log('\n【リダイレクト】');
    for (const r of redirects) {
      console.log(`  ${r.expId} ref${r.refId}: [${r.status}] ${r.url}`);
      if (r.redirect) console.log(`    → ${r.redirect}`);
    }
  }

  if (other.length > 0) {
    console.log('\n【その他ステータス】');
    for (const r of other) {
      console.log(`  ${r.expId} ref${r.refId}: [${r.status}] ${r.url}`);
    }
  }

  // 結果を保存
  const outputPath = path.join(__dirname, 'research', 'reference-url-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n結果を ${outputPath} に保存しました`);
})();
