const params = new URLSearchParams(window.location.search)
const conselhoUrl = params.get('conselho')

const conselhoCookie = {}
const c = String(document.cookie).split(';')
for (let i = 0; i < c.length; i++) {
  const neq = String(c[i]).split('=')
  conselhoCookie[neq[0].replace(' ', '')] = neq[1]
}

const conselho = conselhoCookie.Conselho || conselhoUrl

export default function useConselho () {
  return { conselho }
}
