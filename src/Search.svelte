<style>
    #logo {
        object-fit: cover;
        width: 100%;
        max-width: 300px;
    }
    form {
        height: 50px;
        width: 400px;
        display: flex;
        border-radius: 5px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    }
    input[type=search] {
        height: 100%;
        width: 80%;
        margin: 0;
        border: 0;
        box-sizing: border-box;
        border-radius: 5px 0 0 5px;
        padding: 10px;
        font-size: 24px;
        font-family: Kanit, sans-serif;
    }
    input[type=submit] {
        height: 100%;
        width: 20%;
        margin: 0;
        border: 0;
        box-sizing: border-box;
        border-radius: 0 5px 5px 0;
        background-color: #242424;
        color: white;
        font-size: 24px;
    }
</style>

<script lang="typescript">
    function toUserPage() {
        location.href = document.querySelector('input[type=search]').value
        return false
    }
</script>

<img id="logo" alt="Ent2ml logo" src="/img/logo.png"/>
<form on:submit|preventDefault={toUserPage}>
    <input name="username" type="search" required minlength="4" maxlength="20" placeholder="엔트리 계정 ID 입력">
    <input type="submit" value="검색">
</form>