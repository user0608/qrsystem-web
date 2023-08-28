export const formaturl = (baseurl: string) => {
  if (baseurl.length > 0) {
    if (baseurl[baseurl.length - 1] === '/') {
      baseurl = baseurl.substring(0, baseurl.length - 1)
    }
  }
  return baseurl
}
export const joinurl = (baseurl: string, url: string) => {
  if (url === undefined || url === '') {
    url = '/'
  } else if (url.length > 0) {
    if (url[0] !== '/') {
      url = '/' + url
    }
  }
  return `${baseurl}${url}`
}
export const transformMeasure = (ref: number, targetRef: number, measure: number) => {
  return (targetRef * measure) / ref
}

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text)
  } else {
    return document.execCommand('copy', true, text)
  }
}
