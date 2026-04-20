const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const {
  PollyClient,
  SynthesizeSpeechCommand,
} = require("@aws-sdk/client-polly");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
dotenv.config();
const logger = require("../config/logger");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const pollyClient = new PollyClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Function to generate pre-signed URL for S3 upload
 * @param {string} filename - The name of the file to upload
 * @param {string} contentType - The MIME type of the file
 * @param {string} key - The S3 key path for the file
 * @returns {string} - The pre-signed URL for uploading the file
 */
const generatePresignedUrl = async (contentType, key) => {
  try {
    logger.info("generate pre-signed URL for S3 upload API is called");
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });
    return url;
  } catch (error) {
    console.error(
      `Error generating upload doc pre-signed URL: ${error.message}`
    );
    throw new Error(
      `Error generating upload doc pre-signed URL: ${error.message}`
    );
  }
};

/**
 * Function to generate pre-signed URL for S3 download
 * @param {string} key - The S3 key path for the file
 * @returns {string} - The pre-signed URL for downloading the file
 */
const generateGetObjectUrl = async (key) => {
  try {
    logger.info("generate get object URL for S3 upload API is called");
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });
    return url;
  } catch (error) {
    console.error(
      `Error generating get upload doc pre-signed URL: ${error.message}`
    );
    throw new Error(`Error generating get upload doc pre-signed URL: ${key}`);
  }
};

/**
 * Function to list objects in an S3 bucket
 * @param {string} prefix - The prefix to filter objects
 * @returns {Array} - A list of objects with their keys and metadata
 */
const generateListObjectsUrl = async (key) => {
  try {
    logger.info("generate list objects URL for S3 upload API is called");
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
    const result = await s3Client.send(command);

    return result;
  } catch (error) {
    console.error(`Error listing S3 objects: ${error.message}`);
    throw new Error(`Error listing S3 objects: ${error.message}`);
  }
};

/**
 * Function to list all files in a specific folder within the S3 bucket
 * @param {string} folderPath - The folder path in the S3 bucket
 * @returns {Array} - List of files in the folder
 */
const listFilesInFolder = async (folderPath) => {
  try {
    logger.info("list files in folder for S3 upload API is called");
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: folderPath, // Specify the folder path as the prefix
    });

    const result = await s3Client.send(command);
    const fileList = result.Contents.map((item) => item.Key);

    return fileList; // Returns an array of file keys in the folder
  } catch (error) {
    console.error(`Error listing files in folder: ${error.message}`);
    throw new Error(`Error listing files in folder: ${error.message}`);
  }
};

/**
 * Function to delete a file from an S3 bucket
 * @param {string} key - The S3 key (file path) of the file to delete
 * @returns {Object} - Deletion response
 */
const deleteUploadDocFromS3 = async (key) => {
  try {
    logger.info("delete upload doc from s3 for S3 upload API is called");
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    const result = await s3Client.send(command);
    return result;
  } catch (error) {
    console.error(`Error deleting upload doc from server: ${error.message}`);
    throw new Error(`Error deleting upload doc from server: ${error.message}`);
  }
};

// const deleteMultipleFiles = async (keys) => {
//   try {
//     logger.info("delete multiple files for S3 upload API is called");
//     const objects = keys.map((key) => ({ Key: key }));

//     const command = new DeleteObjectsCommand({
//       Bucket: process.env.S3_BUCKET_NAME,
//       Delete: { Objects: objects },
//     });

//     const result = await s3Client.send(command);
//     return result;
//   } catch (error) {
//     console.error(`Error deleting upload files from server: ${error.message}`);
//     throw new Error(
//       `Error deleting upload files from server: ${error.message}`
//     );
//   }
// };

const deleteMultipleFiles = async (keys) => {
  try {
    if (!keys.length) return;

    logger.info("delete multiple files for S3 upload API is called");

    // AWS S3 allows max 1000 keys per DeleteObjectsCommand
    const batchSize = 1000;

    for (let i = 0; i < keys.length; i += batchSize) {
      const batch = keys.slice(i, i + batchSize);
      const command = new DeleteObjectsCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: { Objects: batch.map((key) => ({ Key: key })) },
      });

      const result = await s3Client.send(command);
      logger.info(
        `✅ Batch ${i / batchSize + 1}: Deleted ${
          result.Deleted?.length || 0
        } files from S3`
      );
    }
  } catch (error) {
    logger.error("❌ Error deleting files from S3:", error.message);
  }
};

const uploadFileInS3 = async (fileName, fileUploadPath, key, contentType) => {
  try {
    logger.info("upload file in s3 API is called");
    const localFilePath = path.resolve(
      __dirname,
      "../..",
      `${fileUploadPath}`,
      fileName
    );
    if (!fs.existsSync(localFilePath)) {
      logger.error(`File not found at path: ${localFilePath}`);
      throw new Error(`File not found at path: ${localFilePath}`);
    }

    const fileSize = fs.statSync(localFilePath).size; // Get file size

    const uploadUrl = await generatePresignedUrl(contentType, key);

    const fileStream = fs.createReadStream(localFilePath);

    // Handle stream errors
    fileStream.on("error", (err) => {
      logger.error("Error reading file stream:", err);
    });

    const response = await axios.put(uploadUrl, fileStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileSize, // Set Content-Length header
      },
    });

    return key;
  } catch (error) {
    console.error(`Error in uploadFileInS3: ${error.message}`);
    throw new Error(`Error uploading file to S3: ${error.message}`);
  }
};

const convertTextToAudio = async (text, filePath, key, index) => {
  try {
    logger.info("convert text to audio API is called");

    // alternate voices Danielle ↔ Patrick
    const voices = ["Danielle", "Patrick"];
    const voiceId = voices[index % voices.length];

    // 1. Convert Text → Audio Stream
    const command = new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      VoiceId: voiceId,
      Engine: "long-form",
    });

    const response = await pollyClient.send(command);

    // Save audio temporarily to local file
    await fs.promises.writeFile(filePath, response.AudioStream);

    // 2. Upload MP3 to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: "audio/mpeg",
      })
    );

    logger.info("Audio uploaded successfully to S3");

    return key;
  } catch (error) {
    console.error(`Error to convert text to audio : ${error.message}`);
    throw new Error(`Error to convert text to audio: ${error.message}`);
  }
};

const convertTextToAudioWithIntro = async (textArray, filePath, key) => {
  try {
    logger.info("convert text to audio with intro API is called");

    // Fixed mapping
    const voices = ["Danielle", "Patrick"];
    const audioBuffers = [];

    // Generate audio for both texts
    for (let i = 0; i < textArray.length; i++) {
      const text = textArray[i];
      const voiceId = voices[i % voices.length];

      const command = new SynthesizeSpeechCommand({
        OutputFormat: "mp3",
        Text: text,
        VoiceId: voiceId,
        Engine: "long-form",
      });

      const response = await pollyClient.send(command);

      // Store audio buffer in array
      audioBuffers.push(
        Buffer.from(await response.AudioStream.transformToByteArray())
      );
    }

    // Merge both buffers
    const mergedBuffer = Buffer.concat(audioBuffers);

    // Save merged audio locally
    await fs.promises.writeFile(filePath, mergedBuffer);

    // Upload single merged MP3 to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: "audio/mpeg",
      })
    );

    return key;
  } catch (error) {
    console.error(
      `Error converting text to audio with intro : ${error.message}`
    );
    throw new Error(
      `Error converting text to audio with intro : ${error.message}`
    );
  }
};

module.exports = {
  generatePresignedUrl,
  generateGetObjectUrl,
  generateListObjectsUrl,
  listFilesInFolder,
  deleteUploadDocFromS3,
  deleteMultipleFiles,
  uploadFileInS3,
  convertTextToAudio,
  convertTextToAudioWithIntro,
};
