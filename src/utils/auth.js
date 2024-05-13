import Cookies from 'js-cookie'

const TokenKey = 'foxai_pc_token'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}

const SiteCodeKey = 'foxai_pc_sitecode'
export function getSiteCode () {
    return Cookies.get(SiteCodeKey)
}

export function setSiteCode (sitecode) {
    return Cookies.set(SiteCodeKey, sitecode)
}

export function removeSiteCode () {
    return Cookies.remove(SiteCodeKey)
}

const themeKey = 'foxai_pc_theme'
export function getTheme () {
    return Cookies.get(themeKey)
}

export function setTheme (theme) {
    return Cookies.set(themeKey, theme)
}

export function removeTheme () {
    return Cookies.remove(themeKey)
}

export function setStorage (name, value) {
    name = getSiteCode() + '_' + name
    return window.localStorage.setItem(name, value)
}
export function getStorage (name) {
    name = getSiteCode() + '_' + name
    return window.localStorage.getItem(name)
}
