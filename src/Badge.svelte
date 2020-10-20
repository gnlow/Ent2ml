<style>
    pos {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }
    mas {
        width: 100%;
        height: 100%;
        mask: url("/img/staff.svg");
        mask-size: cover;
        display: block;
    }
    bg {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(to right bottom, #a2dbec, #f2e6ac 5%, #f1b2dd 10%, #949dc4 15%, #c0f3e2 20%, #a2dbec 25%)
    }
</style>

<script lang="typescript">

</script>

<pos>
    <mas>
        <bg/>
    </mas>
</pos>