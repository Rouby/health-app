import { defineMessage } from "../i18n";
import { prisma } from "../prisma";
import { tags } from "./tags";

export async function upsertInterests() {
  const interests = [
    {
      defaultMessage: "Anilingus",
      imagePath: "/interests/analingus.png",
      descriptionDefaultMessage:
        'Anilingus, also known as "rimming" or "tongue-fucking," is a sexual activity that involves the use of the mouth, tongue, and lips to stimulate the anus of a sexual partner.',

      tags: [tags.practice],
    },
    {
      defaultMessage: "Analsex",
      imagePath: "/interests/analsex.png",
      descriptionDefaultMessage:
        "Anal sex is a sexual activity that involves the insertion of a penis, finger, or other object into the anus of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Bukkake",
      imagePath: "/interests/bukkake.png",
      descriptionDefaultMessage:
        "Bukkake is a sexual practice in which a group of men ejaculate on the face or body of a woman or man.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Cumshot",
      imagePath: "/interests/cumshot.png",
      descriptionDefaultMessage:
        'A cumshot, also known as a "money shot," is a term that is used in pornography to refer to the scene in which a man ejaculates, typically on the face or body of a female sexual partner.',

      tags: [tags.practice],
    },
    {
      defaultMessage: "Cunnilingus",
      imagePath: "/interests/cunnilingus.png",
      descriptionDefaultMessage:
        "Cunnilingus is a sexual practice in which a person uses their mouth, tongue, and lips to stimulate the genital area of a female sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Deepthroating",
      imagePath: "/interests/deepthroating.svg",
      descriptionDefaultMessage:
        "Deepthroating is a sexual practice in which a person takes a penis or other object into their mouth and throat.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Double-penetration",
      imagePath: "/interests/doublepenetration.png",
      descriptionDefaultMessage:
        'Double-penetration, also known as "DP," is a sexual practice in which a person is simultaneously penetrated by two objects, typically two penises or a penis and a sex toy.',

      tags: [tags.practice],
    },
    {
      defaultMessage: "Facesitting",
      imagePath: "/interests/facesitting.jpg",
      descriptionDefaultMessage:
        "Facesitting is a sexual practice in which one person sits on or over the face of another person, typically for the purpose of oral-genital or oral-anal stimulation.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Facial",
      imagePath: "/interests/facial.png",
      descriptionDefaultMessage:
        "A facial is a sexual practice in which a man ejaculates on the face of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Blowjob",
      imagePath: "/interests/fellatio.png",
      descriptionDefaultMessage:
        "A blowjob, also known as oral sex or fellatio, is a sexual practice in which a person uses their mouth, lips, and tongue to stimulate the penis of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Fingering",
      imagePath: "/interests/fingering.png",
      descriptionDefaultMessage:
        "Fingering is a sexual practice in which a person uses their fingers to stimulate the genital area of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Fisting",
      imagePath: "/interests/fisting.png",
      descriptionDefaultMessage:
        "Fisting is a sexual practice in which a person inserts their entire hand into the vagina or anus of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Footjob",
      imagePath: "/interests/footjob.jpg",
      descriptionDefaultMessage:
        "A footjob is a sexual practice in which a person uses their feet to stimulate the genital area of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Group sex",
      imagePath: "/interests/groupsex.png",
      descriptionDefaultMessage:
        "Group sex is a sexual activity that involves more than two people engaging in sexual activity together. There are many different forms of group sex, including threesomes, foursomes, orgies, and more.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Pegging",
      imagePath: "/interests/pegging.png",
      descriptionDefaultMessage:
        "Pegging is a sexual practice in which a woman uses a strap-on dildo to penetrate the anus of a man.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Public sex",
      imagePath: "/interests/publicsex.jpg",
      descriptionDefaultMessage:
        "Public sex is a sexual activity that takes place in a public place, where it may be visible to others.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Teabagging",
      imagePath: "/interests/teabagging.png",
      descriptionDefaultMessage:
        "Teabagging is a sexual practice in which a man places his scrotum in the mouth or on the face of a sexual partner.",

      tags: [tags.practice],
    },
    {
      defaultMessage: "Titjob",
      imagePath: "/interests/titjob.png",
      descriptionDefaultMessage:
        "A titjob, also known as a breast job or a boob job, is a sexual practice in which a person uses their breasts to stimulate the genital area of a sexual partner.",

      tags: [tags.practice],
    },
  ].map(({ tags, ...interest }) => ({
    ...interest,
    translationKey: defineMessage({ defaultMessage: interest.defaultMessage })
      .id,
    descriptionTranslationKey: defineMessage({
      defaultMessage: interest.descriptionDefaultMessage,
    }).id,
    tags: {
      connectOrCreate: tags.map((tag) => ({
        where: { translationKey: tag.translationKey },
        create: tag,
      })),
    },
  }));

  await Promise.all(
    interests.map((interest) =>
      prisma.sexInterest.upsert({
        where: { translationKey: interest.translationKey },
        create: interest,
        update: interest,
      })
    )
  );
}
