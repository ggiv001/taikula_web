self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('taikula').then(function (cache) {
            return cache.addAll([
            ]);
        })
    );
});

self.addEventListener('fetch', function (e) {
//调用接口数据，保存本地缓存中
});
