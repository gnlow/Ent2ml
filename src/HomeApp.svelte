<style>
    #logo {
        object-fit: cover;
        width: 100%;
        max-width: 300px;
    }
    div {
        font-size: 36px;
        text-align: center;
        color: white;
        background: rgba(34, 34, 34, 0.3);
        border-radius: 20px;
        padding: 10px;
    }
    button {
        width: 100%;
        padding: 15px;
        background: linear-gradient(to right, #2c045a , #032852);
        border-radius: 10px;
        box-shadow: 0 4px 5px rgba(34, 34, 34, 0.3);
        border: 0;
        color: white;
        font-size: 36px;
    }
    a {
        color: white;
        text-decoration: none;
    }
</style>

<script lang="typescript">
    import { onMount } from "svelte"

    let path, info, url

    onMount(async () => {
        const path = location.pathname.substring(1)
        switch(true) {
            case /ds/.test(path):
                info = "엔트리 이야기로 이동"
                url = "https://playentry.org/community/entrystory/list"
                break;
            case /all/.test(path):
                info = "작품 공유하기로 이동"
                url = "https://playentry.org/project/list/all"
                break;
            case /.{4,}/.test(path):
                info = "유저 페이지 찾는 중..."
                const id = await fetch("/api/temp_user/"+path).then(r => r.text())
                if (id != "not_found") {
                    info = `${path}님의 유저 페이지로 이동`
                    url = `https://playentry.org/profile/${id}`
                } else {
                    info = `${path}님의 정보를 찾지 못했습니다. :(`
                    url = "https://playentry.org/"
                }
                break;
        }
    })
</script>

<img id="logo" alt="Ent2ml logo" src="/img/logo.png"/>
<div>
    리뉴얼된 엔트리에 맞춰 업데이트하는 중입니다.<br/>
    아래 버튼을 누르면 엔트리로 이동합니다.<br/>
    <button on:click={location.href = url}><a href={url}>{info}</a></button>
</div>