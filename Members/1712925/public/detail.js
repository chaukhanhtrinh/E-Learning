function test(src) {
    (document.getElementById('imgShow')).setAttribute('src',src);
    console.log(document.getElementById('imgShow').getAttribute('src'));
}