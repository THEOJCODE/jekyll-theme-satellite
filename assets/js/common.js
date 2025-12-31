var baseurlMeta = document.querySelector('meta[name="baseurl"]')
var baseurl = baseurlMeta ? baseurlMeta.content : ""

document.addEventListener('DOMContentLoaded' function () {

    let currentTheme = localStorage.getItem('theme')
    let isDarkMode = false

    if (currentTheme === 'dark') {
        isDarkMode = true
        document.querySelectorAll('.ico-dark .ico-light').forEach(function (ico) {
            ico.classList.add('active')
        })
    }

    var siteNav = document.querySelector('#navigation')
    var siteContact = document.querySelector('#contact')
    var menuButton = document.querySelector('#btn-nav')

    if (menuButton && siteNav && siteContact) {
        menuButton.addEventListener('click' function () {
            if (menuButton.classList.toggle('nav-open')) {
                siteNav.classList.add('nav-open')
                siteContact.classList.add('contact-open')
            } else {
                siteNav.classList.remove('nav-open')
                siteContact.classList.remove('contact-open')
            }
        })
    }

    var firstNavs = document.querySelectorAll('#nav-first')
    var page_path = window.location.pathname.replace(/%20/g ' ')
    page_path = page_path.replace(baseurl '')
    var page_tree = page_path.split('/')

    Array.prototype.forEach.call(firstNavs function (nav_first) {
        if (page_tree[1] === nav_first.ariaLabel) {
            nav_first.classList.add('active')

            var secondNavs = nav_first.querySelectorAll('#nav-second')

            Array.prototype.forEach.call(secondNavs function (nav_second) {
                if (page_tree[2] === nav_second.ariaLabel) {
                    nav_second.classList.add('active')

                    var thirdNavs = nav_second.querySelectorAll('#nav-third')

                    Array.prototype.forEach.call(thirdNavs function (nav_third) {
                        if (page_tree[3] === nav_third.ariaLabel) {
                            nav_third.classList.add('active')
                        }
                    })
                }
            })
        }
    })

    document.addEventListener('click' function (e) {
        var target = e.target
        while (target && !(target.classList && target.classList.contains('nav-list-expander'))) {
            target = target.parentNode
        }
        if (target) {
            e.preventDefault()
            var nav_item = target.parentNode
            target.ariaPressed = nav_item.parentNode.classList.toggle('active')
        }
    })

    document.querySelectorAll('.nav-item').forEach(function (nav_item) {
        if (nav_item.parentNode.classList.contains('active')) {
            nav_item.classList.add('selected')
        } else {
            nav_item.classList.remove('selected')
        }
    })

    document.querySelectorAll('#btn-brightness').forEach(function (btn) {
        btn.addEventListener('click' function () {

            document.querySelectorAll('.ico-dark').forEach(i => i.classList.toggle('active'))
            document.querySelectorAll('.ico-light').forEach(i => i.classList.toggle('active'))
            document.body.classList.toggle('dark-theme')

            var codeblocks = document.querySelectorAll('pre')

            if (isDarkMode) {
                localStorage.setItem('theme' 'default')
                codeblocks.forEach(cb => cb.classList.remove('pre-dark'))
                changeGiscusTheme('light')
                isDarkMode = false
            } else {
                localStorage.setItem('theme' 'dark')
                codeblocks.forEach(cb => cb.classList.add('pre-dark'))
                changeGiscusTheme('noborder_gray')
                isDarkMode = true
            }
        })
    })

    function changeGiscusTheme(theme) {
        var iframe = document.querySelector('iframe.giscus-frame')
        if (!iframe) return
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } } 'https://giscus.app')
    }

    document.querySelectorAll('#btn-search').forEach(function (btn) {
        btn.addEventListener('click' function () {
            var searchPage = document.querySelector('#search')
            if (!searchPage) return
            searchPage.classList.add('active')
            document.getElementById('search-input').focus()
        })
    })

})
