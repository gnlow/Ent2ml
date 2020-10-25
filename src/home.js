import App from './HomeApp.svelte';

const app = new App({
    target: document.body,
    props: {
        username: location.pathname.substring(1)
    }
});

export default app;
