const decoded = new Set<string>()

export function imagesAreDecoded(urls: readonly string[]): boolean {
  return urls.every((url) => decoded.has(url))
}

/** Decode off-screen so the page never paints a half-loaded bitmap. */
export async function decodeImages(urls: readonly string[]): Promise<void> {
  await Promise.all(urls.map(decodeOne))
}

async function decodeOne(url: string): Promise<void> {
  if (decoded.has(url)) return
  const image = new Image()
  image.src = url
  try {
    await image.decode()
  } catch {
    await new Promise<void>((resolve) => {
      image.onload = () => resolve()
      image.onerror = () => resolve()
    })
  }
  decoded.add(url)
}
