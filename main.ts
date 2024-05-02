import { Gmail } from "./Gmail";

async function main(){
    const gmail = new Gmail()

    // await gmail.authorizeApplication()

    // await gmail.saveToken(
    //     "4/0AeaYSHCA7XPKouxOwssSij12J7R6Cju_ZjQCUFBLO7bOtzeI08csxV14T7Luzhxoz-WNHQ",
    // );

    await gmail.sendEmail("azumahebenezer1@gmail.com", "Test", "Did it work? Lemme know if you got this email.");
}

main()

// http://localhost/?code=4/0AdLIrYdUFh33PFlC3I6IjIT428kbU4h4XpOyY2Z-OaZ3HMGE8bYpqj-_G9jpo8NZax2zzg&scope=https://www.googleapis.com/auth/gmail.send