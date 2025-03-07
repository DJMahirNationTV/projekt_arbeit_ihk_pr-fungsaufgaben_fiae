async function shortenUrl () {
  const longUrl = document.getElementById('longUrl').value
  const response = await fetch('/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ longUrl })
  })
  const result = await response.json()
  document.getElementById('shortUrl').innerText = result.shortUrl
}

const btn = document.getElementById('button')

btn.addEventListener('click', shortenUrl)
