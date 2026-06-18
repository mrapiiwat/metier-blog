import { S3Client } from "@aws-sdk/client-s3";

if (
	!Bun.env.AWS_REGION ||
	!Bun.env.MINIO_ENDPOINT ||
	!Bun.env.MINIO_ROOT_USER ||
	!Bun.env.MINIO_ROOT_PASSWORD ||
	!Bun.env.MINIO_BUCKET
) {
	throw new Error(
		"Missing required MinIO/S3 environment variables in .env file",
	);
}

export const s3Client = new S3Client({
	region: Bun.env.AWS_REGION,
	endpoint: Bun.env.MINIO_ENDPOINT,
	credentials: {
		accessKeyId: Bun.env.MINIO_ROOT_USER,
		secretAccessKey: Bun.env.MINIO_ROOT_PASSWORD,
	},
	forcePathStyle: true,
});

export const BUCKET_NAME = Bun.env.MINIO_BUCKET;
