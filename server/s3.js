const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "tomsimageboardbucket",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise(); // this returns a promise

    promise
        .then(() => {
            // it worked!!!
            console.log("amazon upload complete");
            next();
            // optionally remove old files
            fs.unlink(path, () => {});
            //this is called a no op function (no operation func)
        })
        .catch((err) => {
            // uh oh
            console.log("something went wrong when uploading to S3: ", err);
            res.sendStatus(500);
        });
};

module.exports.delete = (params) => {
    const promise = s3.deleteObject(params).promise(); // this returns a promise
    promise
        .then(() => {
            // it worked!!!
            console.log("amazon delete complete");
            fs.unlink(params.Key, () => {});
            //this is called a no op function (no operation func)
            return;
        })
        .catch((err) => {
            // uh oh
            console.log("something went wrong when deleting from S3: ", err);
            return;
        });
};
