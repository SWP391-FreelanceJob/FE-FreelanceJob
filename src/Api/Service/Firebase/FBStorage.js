import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../App/Firebase/firebaseconfig";

const storage = getStorage(app);

/**
 * 
 * @param {string} path 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadImageToFirebase = async (path, image) => {
    const imageRef = ref(storage, path);
    const uploadTask = await uploadBytes(imageRef, image);
    return uploadTask.ref;
};

/**
 * 
 * @param {string} pathdoctorId 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadDoctorAvatarToFirebase = async (doctorId, image) => {
    // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
    // const uploadTask = await uploadBytes(doctorAvatarRef, image);
    // return uploadTask.ref;
    return await uploadImageToFirebase(`UserImages/AvatarDoctor/${doctorId}`, image);
};

/**
 * 
 * @param {string} doctorId 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadDoctorAvatarToFirebaseGetDownloadUrl = async (doctorId, image) => {
    if (!image)
        return "";
    const ref = await uploadDoctorAvatarToFirebase(doctorId, image);
    return await getDownloadURL(ref);
};

/**
 * 
 * @param {string} clinicId 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadClinicAvatarToFirebase = async (clinicId, image) => {
    // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
    // const uploadTask = await uploadBytes(doctorAvatarRef, image);
    // return uploadTask.ref;
    return await uploadImageToFirebase(`UserImages/AvatarClinic/${clinicId}`, image);
};

/**
 * 
 * @param {string} clinicId 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadClinicAvatarToFirebaseGetDownloadUrl = async (clinicId, image) => {
    if (!image)
        return "";
    const ref = await uploadClinicAvatarToFirebase(clinicId, image);
    return await getDownloadURL(ref);
};

/**
 * 
 * @param {string} clinicId 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadClinicCoverPhotoToFirebase = async (clinicId, image) => {
    // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
    // const uploadTask = await uploadBytes(doctorAvatarRef, image);
    // return uploadTask.ref;
    return await uploadImageToFirebase(`UserImages/CoverPhotoClinic/${clinicId}`, image);
};

/**
 * 
 * @param {string} clinicId 
 * @param {string} imageName 
 * @param {Blob | File | Uint8Array | ArrayBuffer} image 
 * @returns 
 */
export const uploadClinicCoverPhotoToFirebaseGetDownloadUrl = async (clinicId, imageName, image) => {
    if (!image)
        return "";
    const ref = await uploadClinicCoverPhotoToFirebase(`${clinicId}-${imageName}`, image);
    return await getDownloadURL(ref);
};




