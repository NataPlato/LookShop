let project_folder = require("path").basename(__dirname);
let source_folder = "src";
const FAVICON_SRC_FILE = source_folder + "/img/bgMain.jpg";
const FAVICON_HTML_FILE = "_favicon.html";
const FAVICON_DEST_CATALOG = "favicons";

const FAVICON_CONFIG = {
  path: "/" + FAVICON_DEST_CATALOG, // Path for overriding default icons path. `string`
  appName: project_folder, // Your application's name. `string`
  appShortName: project_folder, // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: project_folder, // Your application's description. `string`
  // developerName: null,                      // Your (or your developer's) name. `string`
  // developerURL: null,                       // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: "en-US", // Primary language for name and short_name
  background: "#020307", // Background colour for flattened icons. `string`
  theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: "/", // set of URLs that the browser considers within your app
  // start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
  version: "1.0", // Your application's version string. `string`
  logging: false, // Print logs to console? `boolean`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  html: "../" + FAVICON_HTML_FILE,
  pipeHTML: true,
  replace: true,
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
  },
};

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    js: project_folder + "/js",
    img: project_folder + "/img",
    fonts: project_folder + "/fonts",
    php: project_folder + "/php",
    favicons: project_folder + "/" + FAVICON_DEST_CATALOG,
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    sass: source_folder + "/sass/style.sass",
    css: [source_folder + "/css/*.css", "!" + source_folder + "/css/style.css"],
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
    php: source_folder + "/php/**/*",
    favicons: source_folder + "/" + FAVICON_DEST_CATALOG,
  },
  watch: {
    html: source_folder + "/**/*.html",
    sass: source_folder + "/sass/**/*.sass",
    css: source_folder + "/css/*.css",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
    php: source_folder + "/php/**/*",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
  fs = require("fs"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  webpcss = require("gulp-webpcss"),
  spriteSvg = require("gulp-svg-sprite"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  favicons = require("favicons").stream,
  log = require("fancy-log"),
  inject = require("gulp-inject");

//https://github.com/peiche/gulp-favicon-inject/blob/master/gulpfile.js
//https://github.com/itgalaxy/favicons
function generateFavicons() {
  del(path.src.favicons);
  src(FAVICON_SRC_FILE)
    .pipe(favicons(FAVICON_CONFIG))
    .on("error", log)
    .pipe(dest(path.src.favicons));
  // del(source_folder + "/" + FAVICON_HTML_FILE);
}

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(
      inject(gulp.src([source_folder + "/" + FAVICON_HTML_FILE]), {
        starttag: "<!-- inject:head:{{ext}} -->",
        transform: function (filePath, file) {
          return file.contents.toString("utf8");
        },
      })
    )
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function justCopyCSS() {
  return src(path.src.css).pipe(dest(path.build.css)).pipe(browsersync.stream());
}

function justCopyPHP() {
  return src(path.src.php).pipe(dest(path.build.php)).pipe(browsersync.stream());
}

function justCopyFavicons() {
  return src(path.src.favicons + "/**/*")
    .pipe(dest(path.build.favicons))
    .pipe(browsersync.stream());
}

function convertSass() {
  return src(path.src.sass)
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(
      webpcss({
        webpClass: ".webp",
        nowebpClass: ".no-webp",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts(params) {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function otf2ttf(params) {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/"));
}

function svgSprite(params) {
  return gulp
    .src([source_folder + "/img/icons/*.svg"])
    .pipe(
      spriteSvg({
        mode: {
          stack: {
            sprite: "../icons.svg",
            example: true,
          },
        },
      })
    )
    // .pipe(dest(path.build.img + "/icons"));
    .pipe(dest(source_folder + "/img/icons"));
}

async function fontsStyle(params) {
  let font_weights_dict = {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  };
  if (!fs.existsSync(source_folder + "/sass/_fonts.sass")) {
    process.stdout.write(
      source_folder + "/sass/_fonts.sass does not exists! Creating and filling in.\r\n"
    );
    fs.writeFileSync(source_folder + "/sass/_fonts.sass", "");
  }
  if (fs.readFileSync(source_folder + "/sass/_fonts.sass") == "") {
    return fs.readdir(path.build.fonts, (err, items) => {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".")[0];

          let font_weight = 400;
          Object.keys(font_weights_dict).forEach(key => {
            if (
              fontname.toLowerCase().indexOf(key) >= 0 ||
              fontname.toLowerCase().indexOf(font_weights_dict[key]) >= 0
            ) {
              font_weight = font_weights_dict[key];
            }
          });
          if (c_fontname != fontname) {
            fs.appendFileSync(
              source_folder + "/sass/_fonts.sass",
              `@include font("${fontname.split("-")[0]}", "${fontname}", "${font_weight}", "${
                fontname.toLowerCase().indexOf("italic") >= 0 ? "italic" : "normal"
              }")\r\n`,
              cb
            );
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.sass], convertSass);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.php], justCopyPHP);
  gulp.watch([path.watch.css], justCopyCSS);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(
  clean,
  html,
  fonts,
  fontsStyle,
  gulp.parallel(js, convertSass, justCopyCSS, justCopyPHP, justCopyFavicons, images)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.generateFavicons = generateFavicons;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.otf2ttf = otf2ttf;
exports.images = images;
exports.svgSprite = svgSprite;
exports.js = js;
exports.sass = sass;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
