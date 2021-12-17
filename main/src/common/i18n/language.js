import Cookie from 'js-cookie'

/**
 * 当前语言
 * @param baseNumber
 * @returns {*}
 */
export function getLanguage() {
  let cookieLang = Cookie.get('language')
  let localLang = window.localStorage.getItem('language')
  // 中文，英文，繁体都不存在默认采用中文显示
  if (cookieLang && cookieLang !== 'zh' && cookieLang !== 'en' && cookieLang !== 'tw') {
    cookieLang = 'zh'
  }
  // 本次存储 中文，英文，翻译都不存在了默认中文显示
  if (localLang && localLang !== 'zh' && localLang !== 'en' && localLang !== 'tw') {
    localLang = 'zh'
  }
  // 获取浏览器的默认语言
  let browserLanguage = (navigator.language || navigator.browserLanguage).toLowerCase()
  // 这块浏览器的语言获取是语言-地区形式，繁体和简体会显示为zh-tw，zh-cn，需要先截取tw后，再去截取zh
  if (browserLanguage.indexOf('tw') > -1) {
    browserLanguage = 'tw'
  } else if (browserLanguage.indexOf('zh') > -1) {
    browserLanguage = 'zh'
  } else if (browserLanguage.indexOf('en') > -1) {
    browserLanguage = 'en'
  } else {
    browserLanguage = 'zh'
  }

  // 返回当前语言
  return cookieLang || localLang || browserLanguage
}

/**
 * 设置当前语言环境
 * @param lang 当前语言 'en', 'zh', 'tw'
 */
export function setLanguage(lang) {
  Cookie.set('language', lang, { path: '/', domain: window.location.hostname })
  window.localStorage.setItem('language', lang)
}

export default {
  getLanguage,
}
