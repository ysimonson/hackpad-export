var Hackpad = require("hackpad");
var fs = require("fs");

var argv = require("optimist")
    .usage("Exports hackpad documents")

    .options("c", {
        alias: "client_id",
        describe: "The hackpad client ID"
    })

    .options("s", {
        alias: "secret",
        describe: "The hackpad secret"
    })

    .options("f", {
        alias: "format",
        describe: "The format to export the hackpad in (either 'html', 'md' or 'txt' - defaults to 'html')"
    })

    .demand("c", "s")
    .argv;

if(argv.format && !(argv.format in { html: true, md: true, txt: true })) {
    throw new Error("Format must be 'html', 'md' or 'txt'");
}

var client = new Hackpad(argv.client_id, argv.secret);
var format = argv.format || "html";

argv._.forEach(function(padId) {
    client.export(padId, null, format, function(error, response) {
        if(error) {
            console.error(error);
        } else {
            fs.writeFileSync(padId + "." + format, response);
        }
    });
});
