'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { NoiseOverlay } from '@/components/ui/noise-overlay';

export default function CompanyLogin() {
    const { supabase } = useSupabase();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback?next=/company/onboarding`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback?next=/company/onboarding`,
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Check your email for the magic link!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center font-sans selection:bg-blue-500/30">
            <NoiseOverlay />

            {/* Blue Edge Gradient */}
            <div className="absolute bottom-0 right-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-60 transform translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-40 transform translate-y-1/3 translate-x-1/3" />

            {/* Back to Home */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group text-sm font-medium tracking-wide"
                >
                    <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                {/* Login Card */}
                <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight font-space-grotesk">
                            Company Access
                        </h1>
                        <p className="text-white/50 leading-relaxed text-sm">
                            License ethical, consented datasets for AI training
                        </p>
                    </div>

                    <div className="space-y-6">
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            size="lg"
                            className="w-full relative flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 border-none h-12 font-medium transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {/* Google Icon */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="bg-black/50 backdrop-blur-sm px-4 text-white/30">Or continue with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Enter business email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={error}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 transition-colors focus:border-blue-500/50 focus:bg-white/10"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Magic Link'}
                            </Button>
                        </form>
                    </div>

                    {message && (
                        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 text-center animate-in fade-in slide-in-from-bottom-2">
                            {message}
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <p className="text-center text-sm text-white/40">
                            Are you a data contributor?{' '}
                            <Link href="/contributor/login" className="text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white/50 pb-0.5">
                                Switch to Contributor
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
