const svgLightButton = () =>(
    `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>`);

const svgDarkButton = () => (
    `<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24"
    fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
    </svg>`
);

// div con btn de modos index.hmtl linea 28
// btn modo dark id: theme_dark
// btn modo light id: theme_light

$( document ).ready(function themeLight(){
    //btn modo claro
    $("#theme_light").html( svgLightButton );
    $("#theme_light").append(` <span class="text-black">𝑳𝒊𝒈𝒉𝒕</span> `);
    $("#theme_light").click( () => {
        $("#theme_light").toggle();
        $("#theme_dark").toggle();
        $("body").removeClass("bg-black");
        $("body").css("transition", "300ms");
        guardarStorage("theme_dark", false);
    });
    themeDark();
});

function themeDark (){
    //oculto btn modo claro
    $("#theme_light").toggle();
    $("#theme_dark").html( svgDarkButton )
    $("#theme_dark ").append(` <span class="text-white">𝑫𝒂𝒓𝒌</span> `);
    // btn modo oscuro
    $('#theme_dark').click( () =>{
    $("#theme_dark").toggle();
    $("#theme_light").toggle();
    $("body").addClass("bg-black");
    $("body").css("transition", "300ms");
    guardarStorage("theme_dark", true)
    });
    //theme por preferencia
    if (recuperarStorage("theme_dark") === true ) {
            $("body").toggleClass("bg-black");
            $("#theme_light").toggle();
            $("#theme_dark").toggle();
    }else {
        $("body").removeClass("bg-black");
    }
}
