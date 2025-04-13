"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/config";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const authenticator = async () => {
	try {
		const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			);
		}

		const data = await response.json();
		const { signature, expire, token } = data;

		return {
			signature,
			expire,
			token,
		};
	} catch (error: any) {
		throw new Error(`Authentication request failed: ${error.message}`);
	}
};

interface Props {
	type: "image" | "video";
	accept: string;
	placeholder: string;
	folder: string;
	variant: "dark" | "light";
	onFileChange: (filePath: string) => void;
	value?: string;
}

const FileUpload = ({
	placeholder,
	accept,
	type,
	folder,
	variant,
	onFileChange,
}: Props) => {
	const ikUploadRef = useRef<any>(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);
	const [progress, setProgress] = useState(0);

	const syles = {
		button:
			variant === "dark"
				? "bg-dark-300"
				: "bg-light-600 border border-gray-100",
		placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
		text: variant === "dark" ? "text-light-100" : "text-darl-400",
	};

	const onError = (error: any) => {
		console.log(error);
		toast.error(`Your ${type} could not be uploaded, please try again.`);
	};
	const onSuccess = (res: any) => {
		setFile(res);
		onFileChange(res.filePath);

		toast.success(`${type} uploaded successfully: ${res.filePath}`);
	};

	const onValidate = (file: File) => {
		if (type === "image") {
			if (file.size > 1024 * 1024 * 20) {
				toast.error(`File size exceeds 20MB`);
				return false;
			}
		} else if (type === "video") {
			if (file.size > 1024 * 1024 * 50) {
				toast.error(`File size exceeds 50MB`);
				return false;
			}
		}
		return true;
	};

	return (
		<ImageKitProvider
			publicKey={config.env.imageKit.publicKey}
			urlEndpoint={config.env.imageKit.urlEndpoint}
			authenticator={authenticator}
		>
			<IKUpload
				className="hidden"
				ref={ikUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				useUniqueFileName={true}
				validateFile={onValidate}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => {
					const percent = Math.round((loaded / total) * 100);
					setProgress(percent);
				}}
				folder={folder}
				accept={accept}
			/>
			<Button
				className={cn("upload-btn", syles.button)}
				disabled={progress > 0 && progress < 100}
				onClick={(e) => {
					e.preventDefault();

					if (ikUploadRef.current) {
						ikUploadRef.current?.click();
					}
				}}
			>
				<Image
					src="/icons/upload.svg"
					alt="upload-icon"
					width={20}
					height={20}
					className="object-contain"
				/>
				<p className={cn("text-base", syles.placeholder)}>{placeholder}</p>
				{file && (
					<p className={cn("upload-filename", syles.text)}>{file.filePath}</p>
				)}
				{/*file && <p className="upload-filename">{file.filePath}</p>*/}
			</Button>

			{progress > 0 && progress !== 100 && (
				<div className="w-full rounded-full bg-green-200">
					<div className="progress" style={{ width: `${progress}%` }}>
						{progress}%
					</div>
				</div>
			)}
			{file &&
				(type === "image" ? (
					<IKImage
						alt={file.filePath}
						path={file.filePath}
						width={500}
						height={500}
					/>
				) : type === "video" ? (
					<IKVideo
						path={file.filePath}
						controls={true}
						className="h-96 w-full rounded-xl"
					/>
				) : null)}
		</ImageKitProvider>
	);
};

export default FileUpload;
