
Creamos un proyecto de react, para hacerlo más ligero lo hacemos mediante [vite](https://vite.dev/):

```bash
npm create vite@latest
```

---
## Instalando GSAP para Animaciones 🎨 

Después de crear el proyecto, el siguiente paso es instalar las **dependencias clave** que usaremos para las animaciones y el manejo de *media queries*: **GSAP** y **react-responsive**. Ejecuta esta línea para instalar todas las dependencias necesarias:

```bash
npm install gsap @gsap/react react-responsive
```

### Preparando el Entorno 
Antes de continuar, es una buena práctica dejar limpio el proyecto. Por ello, te recomendamos: 

1. Eliminar el contenido de las carpetas y archivos que no utilizaremos: 
	* `assets` 
	* `App.jsx`
	* `index.css` 

### Registro de Plugins de GSAP 
Vamos a utilizar dos plugins esenciales de GSAP: **ScrollTrigger** y **SplitText**. Para que estos plugins funcionen correctamente, debemos registrarlos. 

Sigue estos dos pasos para la importación y el registro: 
1. **Importa los plugins** que necesitas usando esta línea de código: 
```javascript 
import { ScrollTrigger, SplitText } from 'gsap/all' 
```
 
2. **Registra los plugins** usando la función `gsap.registerPlugin()`: 
```javascript 
gsap.registerPlugin(ScrollTrigger, SplitText)
``` 

> **Consejo Clave:** Para mantener tu código **limpio y organizado**, lo mejor es registrar estos plugins en el archivo **`App.jsx`**. Si no los registras allí, tendrás que importarlos y registrarlos en *cada* componente donde vayas a utilizarlos. ¡Así te ahorras trabajo! 
 
 ---

## Instalando Tailwind CSS en Vite ✨

Tailwind CSS nos permitirá crear estilos de manera increíblemente rápida. Seguiremos la guía oficial para integrarlo con Vite.

A continuación, los pasos para la instalación:

1.  **Instala las dependencias** de Tailwind CSS desde la terminal:

```bash
npm install tailwindcss @tailwindcss/vite
```

2.  **Configura el plugin** en el archivo `vite.config.js`. Debes hacer dos cosas:
    * Importar el plugin: `import tailwindcss from '@tailwindcss/vite'`
    * Añadir `tailwindcss()` al *array* de `plugins`.

    Tu archivo `vite.config.js` final debe lucir similar a este:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),],
})
```

3.  **Importa Tailwind CSS** en tu archivo CSS (por ejemplo, `index.css`) con esta línea:

```css
@import "tailwindcss";
```

---

## Creando Clases de Utilidad Personalizadas 🛠️

Una de las grandes ventajas de Tailwind es la posibilidad de crear tus propios *utility classes* o **clases de utilidad personalizadas**. Esto te ayuda a reutilizar conjuntos de estilos rápidamente.

Para crear una clase personalizada, utiliza la directiva `@utility` y la directiva `@apply` de esta forma:

```css
@utility nombreClase {
	@apply estilos
}
```

---

### Componente Navbar

Para crear un componente, deberemos de hacerlo en la carpeta **components** que tenemos que crear dentro de la carpeta **src**, los componentes deben empezar siempre por mayusculas, en nuestro caso sera: Navbar.jsx.

Para hacer el componente más sencillo, crearemos una carpeta llamada **constants** que ira en el directorio raiz, donde pondremos las constantes que vamos a utilizar para nuestros componentes, como en este caso cada enlace de la navbar. Es importante exportar las constantes para poder usarlas en los otros archivos

```
export const navLinks = [
    { id: 'cocktails', title: 'Cocktails' },
    { id: 'about', title: 'About Us' },
];
```

En caso de que tuvieramos multiples constantes, podriamos exportarlas todas a la vez al final, en vez de poner export en todas y cada una de ellas. 

Una vez tenemos las constantes, ya podemos usarlas junto a la función .map() para crear listas de maneras dinamicas, esto lo podemos hacer la siguiente manera:

```
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
```

Es importante tener en cuenta, que cuando generemos algo de manera dinamica en react, deberemos de añadirle una propiedad key, sin esto, no funcionara.

Para utilizar imagenes tendremos que tenerlas en la carpeta **public** en nuestro directorio raiz, una vez esten ahi podremos importarlas desde cualquier pagina o componente para utilizar, es importante que la ruta empezara desde la carpeta que tiene las imagenes, no desde la carpeta plubic.

Una vez tenemos el componente hecho, el cual seria el siguiente:

```
        <nav>
            <div>
                <a href="#home" className='flex items-center gap-2'>
                    <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>
  
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
```

Vamos a animarlo usando GSAP, para esto utilizaremos la función useGSAP(), la cual hay que importar y dentro crearemos una constante llamada **navTween**, el nombre es debido a que el tweening en la animación, es el proceso de crear imagenes que van entre los frames para que parezca real. 

Creamos la constante para usar una timeline a la cual aplicaremos el scrollTrigger, escogiendo como trigger la propia navbar, es decir, **nav** y pondremos que empiece cuando la parte inferior de la navbar alcance  la parte superior de la pantalla.

```
    useGSAP(()=>{
        const navTween = gsap.timeline({
        })
    },[])
```

Una vez tenemos eso, utilizaremos la función gsap.fromTo() para que la navbar tenga el fondo transparante pero acabe estando difuminada y un poco grisacia, ademas le añadiremos "power1.inOut", para que quede más suave la transición, ademas de una duración de un segundo para que no sea lento pero tampoco sea un cambio brusco:

```
        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
```

Nuestro codigo final para animar la navbar deberia verse tal que asi:

```
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    }, []);
```

## Hero layout

Lo primero que haremos sera creare su archivo correspondiente en la carpeta de componentes y añadirlo al App.jsx, de esta manera todo lo que hagamos podremos verlo facilmente en la pagina principal, empezaremos creando la estructura principal que es la siguiente:

```
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>MOJITO</h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />
                
                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>Cool. Crips. Classic</p>
                            <p className='subtitle'>
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className='view-cocktails'>
                            <p className='subtitle'>Every cocktail on our menu is a blend of premium ingredientes, creative flair, and timeless recipes - designed to delight your senses.</p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
```

Una vez tenemos la estructura principal con el texto, empezaremos a animar el texto, para esto vamos a utilizar el plugin que habiamos instalado y configurado previamente.

Para animar el titulo letra por letra, deberemos de separar dicho texto por caracteres y palabras, mientras que los subtitulos los animaremos por linea, por lo que solamente tendremos que separarlos en lineas, para eso utilizaremos el siguiente codigo:

```
    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'line' });
    }, []);
```

Para animar el titulo principal, queremos añadir una clase especial a cada letra y además animar cada letra, para ello, usando la constante que hemos creado antes, llamada heroSplit, accederemos a las letras y por cada una le añadiremos la clase, ademas de animarlas posteriormente con gsap.from() para que aparezcan abajo y se vayan moviendo hacia arriba.

```
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });
```

Es importante tener en cuenta que si hacemos una animación que no es rapida, aunque nos parezca llamativo, probablemente sea una mala idea, ya que podemos darle sensación de que la pagina funciona lento o mal al usuario y no es lo que queremos.

Para animar las lineas de los titulos inferiores, solamente queremos que aparezcan de abajo arriba y no se note muy brusco, por lo que le pondremos que empiecen con opacidad 0 y el resto sera practicamente igual que la animación anterior, excepto por el detalle de añadirle un segundo de delay, ya que si todas las animaciones ocurren a la vez, al usuario no le da tiempo a notarlas y verlas, por lo que parte de tu trabajo pasaria desapercibido.

```
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        });
```

Como ahora queremos animar las hojas para cuando hagas scroll, deberemos de añadir un div temporal el cual tenga contenido para que podamos scrollear y poder hacer y comprobar la animación, en caso de que no añadir este div, no tendriamos forma de escrollear, por tanto, no podriamos comprobar la animación. (el div hay que añadirlo en la pagina de App.jsx).

```
<div className='h-dvh bg-black'></div>
```

Ahora, una vez podemos escrollear, si que podemos animar y comprobar la animación de las hojas, como queremos usar el scrollTrigger, deberemos de utilizar una timeline, además, como nuestro objetivo es que cada hoja se mueva para un lado diferente, deberemos de crear una animación para cada una, pero como es solamente moverse sera sencillo. 

La animación empezara cuando la parte de arriba de nuestra sección hero, alcanze la parte de arriba de la pantalla y terminara cuando la parte de abajo de hero alcanze la parte de arriba de la pantalla, si añadimos la propiedad scrub, esto hara que se mueva de forma natural a la vez que scrolleamos en vez de hacerlo directamente, además de esto, como queremos hacer dos animaciones diferentes, tendremos que utilizar dos .to() para que una acabe más arriba y otra más abajo, para hacer que las dos animaciones empiecen a la vez, deberemos de añadirle un 0 como tercer argumento.

```
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0);
```


## Animación principal

Esta animación, aunque asi lo parece, es un video que nosotros haremos que funcione en base  al scroll, para ello, necesitaremos crear debajo de la sección principal, un div que es en el que estara el video.

```html
<div className='video absolute inset-0'></div>
```

Es importante que tenga el inset-0 para que este por detras de todo y no tape nada, dentro del div añadiremos el video, importante poner el playsInLine para que no salga  nada del reproductor y el muted, para que no tenga sonido, no suele ser buena idea que tu pagina tenga videos con sonidos para hacer las animaciones

```
<div className='video absolute inset-0'>
  <video ref={videoRef} src="/videos/input.mp4" muted playsInline preload='auto' />
</div>
```

Es importante añadirle el ref, para poder trabajar con el video gracias al useRef de React, ademas de crear la constante para poder usar la referencia, crearemos una utilizando el useMediaQuery para los mobiles, teniendo asi  dos constantes:

```javascript
const videoRef = useRef();
const isMobile = useMediaQuery({ maxWidth: 767 });
```

Una vez tenemos estas dos constantes, dentro del useGSAP crearemos otras dos constantes que sera cuando inicie y cuando acabe la animación, lo hacemos con constantes ya que queremos que empiece o acabe dependiendo del dispositivo, ya que si es un mobil quedaria peor cierta animación, asi que crearemos los siguientes valores:

```javascript
const startValue = isMobile ? 'top 50%' : 'center 60%';
const endValue = isMobile ? '120% top' : 'bottom top';
```

Estamos utilizando una condición ternaria, para en caso de que sea un mobil, es decir, su resolución sea más pequeña, el inicio sea diferente, ya que empezara cuando la parte de arriba del video alcance el 50% de la pantalla, mientras que si no lo es, empezara cuando el centro del video alcance el 60% de la pantalla y similar para terminar la animación, en el caso del movil, cuando la parte de arriba del video este un 120% por encima de la pantalla acabara mientras que en la resolución más grande acabara cuando la parte de abajo del video haya llegado a la parte de arriba de la pantalla.

Una vez tenemos estas constantes ya hecha, haremos la animacion:

```javascript
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
    }
});

videoRef.current.onloadedmetadata = () => {
    tl.to(videoRef.current, {
        currentTime: videoRef.current.duration
    });
};
```

Si probramos la animación, veremos que va un poco rara, como si fuera a trozitos en vez de ir fluido, eso se debe a que el scrollTrigger de GSAP utilizar los keyframes de los videos y por norma general los videos solo suelen tener keyframes cada ciertos frames, por lo que deberemos de utilizar herramientas como FFmpeg para añadir cada frame como keyframe del video, de esta manera, ahora nuestra animación sera mucho más fluida y mejor.

```
ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
```

(La parte más importante es la de -g 1, que es lo que cambie )

## Componente Cocktails

Lo primero que tenemos que hacer es crear un archivo llamado Cocktails.jsx en la carpeta de componentes y añadirlo en el App.jsx para que aparezca en la pagina, una vez tenemos hecho eso, cambiamos el div inicial del componente por un section y le añadimos un id para poder referenciar dicha seccion facilmente, añadiremos dos imagenes de decoración y despues mapearemos de nuestras constantes los cocteles para que se muestren dinamicamente:

```html
<div className='popular'>
    <h2>Most popular cocktails:</h2>
    <ul>
        {cocktailLists.map((drink) => (
            <li key={drink.name}>
                <div className='md:me-28'>
                    <h3>{drink.name}</h3>
                    <p>{drink.country} | {drink.detail}</p>
                </div>
                <span>- {drink.price}</span>
            </li>
        ))}
    </ul>
</div>
```

Como podemos ver, estamos repitiendo todo el rato el nombre que le hemos puesto al objeto que obtenemos (drink), por lo que vamos arreglarlo para que no tengamos que repetir todo el rato el nombre (drink). Esto lo haremos obteniendo las propiedades directamente, en vez del objeto, para ello añadiremos unos corchetes a la hora de hacer el map y pondremos el nombre de las propiedades en vez de obtener el objeto como tal.

```html
<div className='popular'>
    <h2>Most popular cocktails:</h2>
    <ul>
        {cocktailLists.map(({ name, country, detail, price }) => (
            <li key={name}>
                <div className='md:me-28'>
                    <h3>{name}</h3>
                    <p>{country} | {detail}</p>
                </div>
                <span>- {price}</span>
            </li>
        ))}
    </ul>
</div>
```

Una vez tenemos esto, volveremos a crear una estructura igual pero en vez de tener la clase de popular y esa lista, tendra la clase de loved y la lista de mockTailLists, quedando una estructura final del componente:

```html
<section id='cocktails' className='noisy'>
    <img src="/images/cocktail-left-leaf.png" alt='l-leaf' id="c-left-leaf" />
    <img src="/images/cocktail-right-leaf.png" alt='r-leaf' id="c-right-leaf" />

    <div className='list'>
        <div className='popular'>
            <h2>Most popular cocktails:</h2>
            <ul>
                {cocktailLists.map(({ name, country, detail, price }) => (
                    <li key={name}>
                        <div className='md:me-28'>
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>- {price}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className='loved'>
            <h2>Most loved cocktails:</h2>
            <ul>
                {mockTailLists.map(({ name, country, detail, price }) => (
                    <li key={name}>
                        <div className='me-28'>
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>- {price}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
</section>
```

Una vez tenemos esto, animaremos las dos hojas que pusimos de decoración, como hemos hecho anteriormente tendremos que añadir useGSAP e importarlo, es importante recordar que como vamos a usar scrollTrigger deberemos de crear una timeline, ademas recordad que como esta registrado en el archivo de App.jsx, no es necesario que nosotros lo registremos ahora.

La animación que queremos darle a las hojas es una simple y sencilla, que simplemente se haga sentir que la pagina no es un png estetico, por lo que simplemente las moveremos un poco para que de la sensación de bienvenida o entrada, pondremos una más arriba que la otra para que no vaya a la vez, ya que en los elementos de la naturaleza es raro ver simetria

```javascript
useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#cocktails",
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
        }
    });

    parallaxTimeline.from('#c-left-leaf', {
        x: -100, y: 100
    }).from('#c-right-leaf', {
        x: 100, y: 100
    });
}, []);
```

## Componente About.jsx

Como siempre empezaremos creando un archivo llamado About.jsx en la carpeta de componentes el cual tendra lo esencial de react, es decir: 

```
import React from 'react';

const About = () => {
    return (
        <div>About</div>
    );
};

export default About;
```

y lo añadiremos al archivo principal, App.jsx, lo primero que tenemos que hacer es crear la estructura de la seccion, la cual es la siguiente:

```
<div id='about'>
    <div className='mb-16 md:px-0 px-5'>
        <div className='content'>
            <div className='md:col-span-8'>
                <p className='badge'>Best Cocktails</p>
                <h2>Where every detail matters <span className='text-white'>-</span>
                    from muddle to garnish
                </h2>
            </div>
            <div className='sub-content'>
                <p>
                    Every cocktail we serve is a reflection of our obsession with detail from the first muddle to the final garnish. That care is what turns simple drink into something truly memorable.
                </p>
                <div>
                    <p className='md:text-3xl text-xl font-bold'>
                        <span>4.5</span>/5
                    </p>
                    <p className='text-sm text-white-100'>
                        More than  +12000 customers
                    </p>
                </div>
            </div>
        </div>
    </div>
    
    <div className='top-grid'>
        <div className='md:col-span-3'>
            <div className='noisy' />
            <img src="/images/abt1.png" alt="grid-img-1" />
        </div>
    </div>
</div>
```

La animación sera una animación bastante sencilla, en las que las letras apareceran una detras de otra, bastante similar a la animación principal del titulo MOJITO, pero esta vez en de estar y colocarse, van a aparecer, siendo una animación simple pero elegante, para ello tendremos que usar otra el SplitText, con el tipo de words, para que vaya palabra por palabra, en vez de letra por letra, le añadimos el scrolltrigger para que se active segun bajamos pero no le ponemos el scrub, ya que queremos que una vez se inicie la animación acabe y se queden todas las letras bien, ya que esto podria dificultar la lectura en caso de que estuviera el scrub

```javascript
useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {
        type: 'words'
    });

    const scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top center'
        }
    });

    scrollTimeline.from(titleSplit.words, {
        opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
    })
    .from('.top-grid div, .bottom-grid div', {
        opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.04
    }, '-=0.5');

}, []);
```

Importante aclarar  que en el segundo .from(), al estar animando 2 elementos diferentes, le añadimos un tercer parametro para que empiece la animación del segundo elemento cuando hayan pasado 0.5 segundos, es importante ponerlo con el -= ya que si no esperara al segundo 0.6 para iniciar la animación

## Componente Art.jsx

Lo primero que haremos sera crear un archivo llamado Art.jsx en la carpeta de componente y una vez hemos creado lo basico de React, lo añadiremos en la pagina principal, App.jsx, despues de eso crearemos la estructura basica de la pagina:

```

```

## Componente Menu


