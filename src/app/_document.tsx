import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSX } from 'react/jsx-runtime';

class AppDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en" suppressHydrationWarning={true} >
                <Head>
                    {/* Metadata */}
                    {/* General */}
                    <meta
                        name="description"
                        content="Etching Begins With BitRunes"
                    />
                    <meta
                        name="keywords"
                        content="Bitrunes, etching"
                    />

                    <meta property="og:title" content="Bitrunes" />
                    <meta
                        property="og:description"
                        content="Etching Begins With BitRunes."
                    />
                    <meta property="og:image" content="https://i.ibb.co/1JMC5Kk/bitrunes-og.png" />
                    <meta property="og:url" content="https://bitrunes.net" />
                    <meta property="og:type" content="website" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Bitrunes" />
                    <meta
                        name="twitter:description"
                        content="Etching Begins With BitRunes."
                    />
                    <meta name="twitter:image" content="https://i.ibb.co/1JMC5Kk/bitrunes-og.png" />
                    <meta name="twitter:site" content="@bitrunes" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default AppDocument