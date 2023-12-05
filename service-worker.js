/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4398442d6f2a609ee8793839e9f67eb7"
  },
  {
    "url": "assets/css/0.styles.adbf470f.css",
    "revision": "593097b22a3eaf3e0299154159ac8d51"
  },
  {
    "url": "assets/img/add_new_role.e76f7c87.png",
    "revision": "e76f7c87fcc99bbaaeafc6999b273057"
  },
  {
    "url": "assets/img/check_grant_is_created.2dfa5769.png",
    "revision": "2dfa576926ac0ccb37b3514e9c268e6c"
  },
  {
    "url": "assets/img/check_grant_is_deleted.8422fe58.png",
    "revision": "8422fe585f8266a180c520faf88afb33"
  },
  {
    "url": "assets/img/check_grant_is_updated.9025ca4a.png",
    "revision": "9025ca4a87b532e6f7683b8710fa3332"
  },
  {
    "url": "assets/img/check_role_is_created.9fbca3f4.png",
    "revision": "9fbca3f4f886a289ab557e6ac9cd81e2"
  },
  {
    "url": "assets/img/check_user_is_created.1c5f738c.png",
    "revision": "1c5f738cdefbbf3dc2f98acad261bd7d"
  },
  {
    "url": "assets/img/check_user_is_deleted.44608cc7.png",
    "revision": "44608cc70971cbc177379cdb83ca108a"
  },
  {
    "url": "assets/img/check_user_is_updated.15e47467.png",
    "revision": "15e4746770defa4d64197dd6fba31977"
  },
  {
    "url": "assets/img/delete_grant.c3f66b51.png",
    "revision": "c3f66b516550e36353aa80f1b9858dc5"
  },
  {
    "url": "assets/img/delete_user.a4af01ad.png",
    "revision": "a4af01ad8f736a4ed7c0be2de8eae159"
  },
  {
    "url": "assets/img/get_all_grants.c8f1c955.png",
    "revision": "c8f1c955e7bceab7a7b6231b35b363a7"
  },
  {
    "url": "assets/img/get_all_roles.8142a779.png",
    "revision": "8142a779ffc97167f54dcbc3a42c3959"
  },
  {
    "url": "assets/img/get_all_users.5367a0b5.png",
    "revision": "5367a0b5d5cb31965bd305b49f87406f"
  },
  {
    "url": "assets/img/get_grant_by_id.36c962b6.png",
    "revision": "36c962b6f3a2877293ab40592456fdcb"
  },
  {
    "url": "assets/img/get_user_by_id.eb09f755.png",
    "revision": "eb09f755096cf6a5ccb9c41e84a5a8af"
  },
  {
    "url": "assets/img/logo.21fcc4f4.svg",
    "revision": "21fcc4f485f8d8cd95ab594fcdc39a0e"
  },
  {
    "url": "assets/img/post_grant.ce48cf7e.png",
    "revision": "ce48cf7e00e72a56147bcc44f4113be9"
  },
  {
    "url": "assets/img/post_user.79b70200.png",
    "revision": "79b702008ca735b98d41b94c74b01578"
  },
  {
    "url": "assets/img/running_tests.7a3331bb.png",
    "revision": "7a3331bb9d303de5afd65f4e04983800"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/start_server.05d0c67f.png",
    "revision": "05d0c67fcfc37452f76efacf3597ff62"
  },
  {
    "url": "assets/img/tests_result.af6837ac.png",
    "revision": "af6837ac22bdccdae5423aa736d4807c"
  },
  {
    "url": "assets/img/updating_grant.bbe2fe5c.png",
    "revision": "bbe2fe5c3acab888e3412001ed597b29"
  },
  {
    "url": "assets/img/updating_user.148a7ed6.png",
    "revision": "148a7ed685f2014f51b3995f976ec68d"
  },
  {
    "url": "assets/js/10.34dba68e.js",
    "revision": "ace80326a5e95694c610a8d3ed0585ff"
  },
  {
    "url": "assets/js/11.c614e14f.js",
    "revision": "e71d8b6e07eeddd4612f9a6345c59100"
  },
  {
    "url": "assets/js/12.96620e01.js",
    "revision": "b7a4c2ecde82254307bc5caa97eee2b9"
  },
  {
    "url": "assets/js/13.2984d05a.js",
    "revision": "18b8d8783a8d013ee1f84d607577243d"
  },
  {
    "url": "assets/js/14.aa51c5a6.js",
    "revision": "dd40b844fac548713a8fd79d317cadbd"
  },
  {
    "url": "assets/js/15.0f7d33fb.js",
    "revision": "27fbfc56cdb33a948ec68359bad5821f"
  },
  {
    "url": "assets/js/16.6e34bd9e.js",
    "revision": "758a4075d29c5db94cc1ca450a06ac39"
  },
  {
    "url": "assets/js/17.2412a692.js",
    "revision": "02e49e07fbf2ebef5cd7a8a79cd48237"
  },
  {
    "url": "assets/js/18.df9683fe.js",
    "revision": "2b2ae06722149940b2667fbcd26d1d77"
  },
  {
    "url": "assets/js/19.36cdbce7.js",
    "revision": "1e16bb4c402f2c34a280f613fcbcec97"
  },
  {
    "url": "assets/js/2.e87e5d58.js",
    "revision": "f4863e9e5c6439b4a72fea4107211caa"
  },
  {
    "url": "assets/js/20.a33f8387.js",
    "revision": "67167b1f3a9816bdc414ff1dc3063615"
  },
  {
    "url": "assets/js/21.3663d6e4.js",
    "revision": "f950f9fa174b40363abe159ef7e68e26"
  },
  {
    "url": "assets/js/22.64226323.js",
    "revision": "1d3399af2997e5396645fc73a96ea24d"
  },
  {
    "url": "assets/js/23.3173e3cc.js",
    "revision": "b3863eb99e3e69696321bf6a09bd3a37"
  },
  {
    "url": "assets/js/24.d9ea6d90.js",
    "revision": "b6a19d72100e5306c8fbd7e7ac2d2367"
  },
  {
    "url": "assets/js/26.6223bf27.js",
    "revision": "7cfed933d4a397d5198067d705dfeba6"
  },
  {
    "url": "assets/js/3.b2e378a6.js",
    "revision": "43f96e1f50d85bf6a17971684dda4d01"
  },
  {
    "url": "assets/js/4.36ae9b2b.js",
    "revision": "34e659c4f5b076a42851d13910620033"
  },
  {
    "url": "assets/js/5.139ff8dd.js",
    "revision": "d26a654e61be1ce21758e67b644706c0"
  },
  {
    "url": "assets/js/6.a0f96bb1.js",
    "revision": "323bde3b3d0357f312a8f34b583bca5f"
  },
  {
    "url": "assets/js/7.787f1e90.js",
    "revision": "2702c9f747d0c3ad46bd2e0135bec487"
  },
  {
    "url": "assets/js/8.c7c06e20.js",
    "revision": "f423bb472dfedc20c225607163d9e63c"
  },
  {
    "url": "assets/js/9.449735ac.js",
    "revision": "a5596f9e7043e0aea543bdcd72c2d551"
  },
  {
    "url": "assets/js/app.b18e022d.js",
    "revision": "0ea556f77fa841fbfd29643b5dfe5183"
  },
  {
    "url": "conclusion/index.html",
    "revision": "f61ca57595576b281817e498c95381cc"
  },
  {
    "url": "design/index.html",
    "revision": "157cbffad9125634039f0f435ab2f742"
  },
  {
    "url": "index.html",
    "revision": "abea2c48cdbb3f5db8b248c446bb2fdf"
  },
  {
    "url": "intro/index.html",
    "revision": "daa1d7df6ab6b82c05efd11ae880fb5b"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "d4cfec88ea6f6f78d6e964338c94f90d"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "8b73f3a83c4c1acb68bab4de41b93c1f"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "54fc04d376f01a9c075d32293c55955b"
  },
  {
    "url": "software/index.html",
    "revision": "d717374def78ae5a817aa0406766d624"
  },
  {
    "url": "test/index.html",
    "revision": "db467e839bee0dff91f9c08cd33e9486"
  },
  {
    "url": "use cases/index.html",
    "revision": "ae77ce97310965c5f1de5fba821f1f1f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
