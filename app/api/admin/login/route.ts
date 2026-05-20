import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }

    // Detect whether the *original* client connection was HTTPS so we only set
    // the Secure flag when the browser can actually return the cookie. Behind a
    // reverse proxy (Coolify/nginx/etc.) the inbound URL is usually http://...
    // and only the X-Forwarded-Proto header records the real scheme.
    const xfProto = request.headers.get('x-forwarded-proto');
    const reqProto = new URL(request.url).protocol; // "http:" | "https:"
    const isHttps = xfProto === 'https' || reqProto === 'https:';

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'admin_session',
      value: process.env.ADMIN_SECRET!,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
      secure: isHttps,
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Bad Request' }, { status: 400 });
  }
}
