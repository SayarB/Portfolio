module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io','upload.wikimedia.org','www.langoly.com','uxwing.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
  
}
