export function getHUD() {
    const hud = document.createElement('div')
    document.body.appendChild(hud)
    
    hud.style.position = 'fixed'
    hud.style.display = 'flex'
    hud.style.justifyContent = 'center'
    hud.style.bottom = '0'
    hud.style.backgroundColor = 'black'
    hud.style.zIndex = '50'
    hud.innerText = 'heeeem'
    hud.style.color = 'white'
    
    
}