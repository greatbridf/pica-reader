import { pica_storage_server_url, pxy_img_url } from "./defs";
import { Image } from "./type";

async function load_pica_image(image: Image, token: string): Promise<Blob> {
    if (image.fileServer !== pica_storage_server_url)
        throw new Error('storage server not supported: ' + image.fileServer)
    let resp = await fetch(`${pxy_img_url}/pic/${image.path}`, {
        headers: {
            authorization: token
        }
    })
    return await resp.blob()
}

export {
    load_pica_image,
}
