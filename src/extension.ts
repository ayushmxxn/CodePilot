import * as vscode from 'vscode';

type WebsiteCategory = {
    category: string;
    websites: { name: string; url: string }[];
};

const websiteCategories: WebsiteCategory[] = [
    {
        category: 'Languages',
        websites: [
            { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
            { name: 'Node.js', url: 'https://nodejs.org/en/' }
        ]
    },
    {
        category: 'Frameworks & Libraries',
        websites: [
            { name: 'Next.js', url: 'https://nextjs.org/' },
            { name: 'React', url: 'https://react.dev/' },
            { name: 'React Native', url: 'https://reactnative.dev/' },
            { name: 'Svelte', url: 'https://svelte.dev/' },
            { name: 'Flutter', url: 'https://flutter.dev/' },
            { name: 'Nest JS', url: 'https://nestjs.com/' },
            { name: 'Electron', url: 'https://www.electronjs.org/' },
            { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
            { name: 'Bootstrap', url: 'https://getbootstrap.com/' },
            { name: 'Nuxt.js', url: 'https://nuxt.com/' },
            { name: 'Tauri', url: 'https://tauri.app/' },
            { name: 'Socket.IO', url: 'https://socket.io/' }
        ]
    },
    {
        category: 'Component Libraries',
        websites: [
            { name: "Serenity UI", url: "https://serenity-ui.com/" },
            { name: 'Aceternity UI', url: 'https://ui.aceternity.com/' },
            { name: 'Shadcn UI', url: 'https://ui.shadcn.com/' },
            { name: 'Dev UI', url: 'https://www.devui.io/' },
            { name: 'Material UI', url: 'https://mui.com/material-ui/' },
            { name: 'Chakra UI', url: 'https://v2.chakra-ui.com/' },
            { name: 'Daisy UI', url: 'https://daisyui.com/' },
            { name: 'Ant Design', url: 'https://ant.design/' },
            { name: 'Next UI', url: 'https://nextui.org/' },
            { name: "Hover", url: "https://www.hover.dev/" },
            { name: "Mantine", url: "https://ui.mantine.dev/" },
            { name: "Radix UI", url: "https://www.radix-ui.com/" },
            { name: "Headless UI", url: "https://headlessui.com/" },
            { name: "Konsta UI", url: "https://konstaui.com/" },
            { name: "Park UI", url: "https://park-ui.com/" },
            { name: "Magic UI", url: "https://magicui.design/" },
            { name: "Flyon UI", url: "https://flyonui.com/" },
            { name: "Hyper UI", url: "https://www.hyperui.dev/" },
            { name: "Sailboat UI", url: "https://sailboatui.com/" },
            { name: "Tailgrids", url: "https://tailgrids.com/" },
            { name: "Tailblocks", url: "https://tailblocks.cc/" },
            { name: "Mamba UI", url: "https://mambaui.com/" },
            { name: "Ruru UI", url: "https://ruru-ui.vercel.app/" },
            { name: "Origin UI", url: "https://originui.com/" }
        ]
    },
    {
        category: 'Animation Libraries',
        websites: [
            { name: 'Hamburgers', url: 'https://jonsuh.com/hamburgers/' },
            { name: 'Animate CSS', url: 'https://animate.style/' },
            { name: 'Anime JS', url: 'https://animejs.com/' }
        ]
    },
    {
        category: 'Backend & Databases',
        websites: [
            { name: 'GraphQL', url: 'https://graphql.org/' },
            { name: 'Neon', url: 'https://neon.tech/' }
        ]
    },
    {
        category: 'Tools',
        websites: [
            { name: 'Code Image', url: 'https://codeimage.dev/' },
            { name: 'Vite', url: 'https://vitejs.dev/' },
            { name: 'Parcel', url: 'https://parceljs.org/' }
        ]
    },
    {
        category: 'Resources',
        websites: [
            { name: 'Neetcode', url: 'https://neetcode.io/' }
        ]
    }
];

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.openDocumentation', () => {
        const menuOptions: vscode.QuickPickItem[] = [];

        websiteCategories.forEach(category => {
            menuOptions.push({ label: `--${category.category.toUpperCase()}--`,});
            category.websites.forEach(website => {
                menuOptions.push({ label: website.name });
            });
        });

        vscode.window.showQuickPick(menuOptions, { placeHolder: 'Select a website' }).then(selection => {
            if (selection && selection.description === '---') {
                return; 
            }
            if (selection && selection.label) {
                const selectedWebsite = findWebsite(selection.label);
                if (selectedWebsite) {
                    openDocumentation(selectedWebsite.name, selectedWebsite.url);
                }
            }
        });
    });

    context.subscriptions.push(disposable);
}

function findWebsite(websiteName: string): { name: string; url: string } | undefined {
    for (const category of websiteCategories) {
        const website = category.websites.find(website => website.name === websiteName);
        if (website) {
            return website;
        }
    }
    return undefined;
}

function openDocumentation(name: string, url: string) {
    const panel = vscode.window.createWebviewPanel(
        'documentation',
        name,
        vscode.ViewColumn.Beside,
        { enableScripts: true }
    );

    panel.webview.html = getWebviewContent(name, url);
}

function getWebviewContent(name: string, url: string) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body, html, iframe {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .loader-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .lds-ring {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .lds-ring div {
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                    width: 64px;
                    height: 64px;
                    margin: 8px;
                    border: 8px solid #3498db;
                    border-radius: 50%;
                    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    border-color: #3498db transparent transparent transparent;
                }

                .lds-ring div:nth-child(1) {
                    animation-delay: -0.45s;
                }

                .lds-ring div:nth-child(2) {
                    animation-delay: -0.3s;
                }

                .lds-ring div:nth-child(3) {
                    animation-delay: -0.15s;
                }

                @keyframes lds-ring {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>
            <title>${name}</title>
            <base target="_self"> <!-- Open links in the same tab -->
        </head>
        <body>
            <div class="loader-container">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            <iframe src="${url}" frameborder="0"></iframe>
            <script>
                document.querySelector('iframe').onload = function() {
                    document.querySelector('.loader-container').style.display = 'none';
                }
            </script>
        </body>
        </html>`;
}
