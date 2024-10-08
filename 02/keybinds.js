CUBE_SIDELENGTH = 10
GAP = 2
document.addEventListener('keypress', e => {
    const key = e.key 
    switch (key) { 
        // Colors
        // white
        case '1':
            cube.color = [1,1,1]
            break;
        // red
        case '2':
            cube.color = [1,0,0]
            break;
        // green
        case '3':
            cube.color = [0,1,0]
            break;
        // blue
        case '4':
            cube.color = [0,0,1]
            break;
        // yellow
        case '5':
            cube.color = [1,1,0]
            break;
        // pink
        case '6':
            cube.color = [1,192/255,203/255]
            break;
        // cyan
        case '7':
            cube.color = [0,1,1]
            break;
        // black
        case '0':
            cube.color = [0,0,0]
            break;

        // Movement
        // forward
        case 'q':
            cube.transform.translateY(CUBE_SIDELENGTH + GAP);
            break;
        // up
        case 'w':
            cube.transform.translateZ(CUBE_SIDELENGTH + GAP);
            break;
        // back
        case 'e':
            cube.transform.translateY(-CUBE_SIDELENGTH - GAP);
            break;
        // left    
        case 'a':
            cube.transform.translateX(CUBE_SIDELENGTH + GAP);
            break;
        // down
        case 's':
            cube.transform.translateZ(-CUBE_SIDELENGTH - GAP);
            break;
        // right
        case 'd':
            cube.transform.translateX(-CUBE_SIDELENGTH - GAP)
            break;

        // download
        case 'o':
            download()
            break;
        // upload
        case 'l':
            upload('scene.json')
            break;

        // place block
        case ' ':
            new_cube = new X.cube()
            new_cube.color = cube.color
            new_cube.transform.matrix = new Float32Array(cube.transform.matrix)
            new_cube.lengthX = new_cube.lengthY = new_cube.lengthZ = CUBE_SIDELENGTH
            
            r.add(new_cube)
            break;  
            
        case 'b':
            toggleRotate = !toggleRotate
            break;
    }
})