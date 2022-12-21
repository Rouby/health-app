import { defineMessage } from "../i18n";
import { prisma } from "../prisma";
import { tags } from "./tags";

export async function upsertInterests() {
  const interests = [
    {
      translationKey: defineMessage({ defaultMessage: "Anilingus" }).id,
      defaultMessage: "Anilingus",
      imagePath: "/interests/analingus.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          'Anilingus, also known as "rimming" or "tongue-fucking," is a sexual activity that involves the use of the mouth, tongue, and lips to stimulate the anus of a sexual partner.',
      }).id,
      descriptionDefaultMessage:
        'Anilingus, also known as "rimming" or "tongue-fucking," is a sexual activity that involves the use of the mouth, tongue, and lips to stimulate the anus of a sexual partner.',

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Analsex" }).id,
      defaultMessage: "Analsex",
      imagePath: "/interests/analsex.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Anal sex is a sexual activity that involves the insertion of a penis, finger, or other object into the anus of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "Anal sex is a sexual activity that involves the insertion of a penis, finger, or other object into the anus of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Bukkake" }).id,
      defaultMessage: "Bukkake",
      imagePath: "/interests/bukkake.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Bukkake is a sexual practice in which a group of men ejaculate on the face or body of a woman or man.",
      }).id,
      descriptionDefaultMessage:
        "Bukkake is a sexual practice in which a group of men ejaculate on the face or body of a woman or man.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Cumshot" }).id,
      defaultMessage: "Cumshot",
      imagePath: "/interests/cumshot.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          'A cumshot, also known as a "money shot," is a term that is used in pornography to refer to the scene in which a man ejaculates, typically on the face or body of a female sexual partner.',
      }).id,
      descriptionDefaultMessage:
        'A cumshot, also known as a "money shot," is a term that is used in pornography to refer to the scene in which a man ejaculates, typically on the face or body of a female sexual partner.',

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Cunnilingus" }).id,
      defaultMessage: "Cunnilingus",
      imagePath: "/interests/cunnilingus.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Cunnilingus is a sexual practice in which a person uses their mouth, tongue, and lips to stimulate the genital area of a female sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "Cunnilingus is a sexual practice in which a person uses their mouth, tongue, and lips to stimulate the genital area of a female sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Deepthroating" }).id,
      defaultMessage: "Deepthroating",
      imagePath: "/interests/deepthroating.svg",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Deepthroating is a sexual practice in which a person takes a penis or other object into their mouth and throat, often to the point of gagging or choking.",
      }).id,
      descriptionDefaultMessage:
        "Deepthroating is a sexual practice in which a person takes a penis or other object into their mouth and throat, often to the point of gagging or choking.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Double-penetration" })
        .id,
      defaultMessage: "Double-penetration",
      imagePath: "/interests/doublepenetration.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          'Double-penetration, also known as "DP," is a sexual practice in which a person is simultaneously penetrated by two objects, typically two penises or a penis and a sex toy.',
      }).id,
      descriptionDefaultMessage:
        'Double-penetration, also known as "DP," is a sexual practice in which a person is simultaneously penetrated by two objects, typically two penises or a penis and a sex toy.',

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Facesitting" }).id,
      defaultMessage: "Facesitting",
      imagePath: "/interests/facesitting.jpg",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Facesitting is a sexual practice in which one person sits on or over the face of another person, typically for the purpose of oral-genital or oral-anal stimulation.",
      }).id,
      descriptionDefaultMessage:
        "Facesitting is a sexual practice in which one person sits on or over the face of another person, typically for the purpose of oral-genital or oral-anal stimulation.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Facial" }).id,
      defaultMessage: "Facial",
      imagePath: "/interests/facial.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "A facial is a sexual practice in which a man ejaculates on the face of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "A facial is a sexual practice in which a man ejaculates on the face of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Blowjob" }).id,
      defaultMessage: "Blowjob",
      imagePath: "/interests/fellatio.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "A blowjob, also known as oral sex or fellatio, is a sexual practice in which a person uses their mouth, lips, and tongue to stimulate the penis of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "A blowjob, also known as oral sex or fellatio, is a sexual practice in which a person uses their mouth, lips, and tongue to stimulate the penis of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Fingering" }).id,
      defaultMessage: "Fingering",
      imagePath: "/interests/fingering.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Fingering is a sexual practice in which a person uses their fingers to stimulate the genital area of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "Fingering is a sexual practice in which a person uses their fingers to stimulate the genital area of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Fisting" }).id,
      defaultMessage: "Fisting",
      imagePath: "/interests/fisting.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Fisting is a sexual practice in which a person inserts their entire hand into the vagina or anus of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "Fisting is a sexual practice in which a person inserts their entire hand into the vagina or anus of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Footjob" }).id,
      defaultMessage: "Footjob",
      imagePath: "/interests/footjob.jpg",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "A footjob is a sexual practice in which a person uses their feet to stimulate the genital area of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "A footjob is a sexual practice in which a person uses their feet to stimulate the genital area of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Group sex" }).id,
      defaultMessage: "Group sex",
      imagePath: "/interests/groupsex.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Group sex is a sexual activity that involves more than two people engaging in sexual activity together. There are many different forms of group sex, including threesomes, foursomes, orgies, and more.",
      }).id,
      descriptionDefaultMessage:
        "Group sex is a sexual activity that involves more than two people engaging in sexual activity together. There are many different forms of group sex, including threesomes, foursomes, orgies, and more.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Pegging" }).id,
      defaultMessage: "Pegging",
      imagePath: "/interests/pegging.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Pegging is a sexual practice in which a woman uses a strap-on dildo to penetrate the anus of a man.",
      }).id,
      descriptionDefaultMessage:
        "Pegging is a sexual practice in which a woman uses a strap-on dildo to penetrate the anus of a man.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Public sex" }).id,
      defaultMessage: "Public sex",
      imagePath: "/interests/publicsex.jpg",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Public sex is a sexual activity that takes place in a public place, where it may be visible to others.",
      }).id,
      descriptionDefaultMessage:
        "Public sex is a sexual activity that takes place in a public place, where it may be visible to others.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Teabagging" }).id,
      defaultMessage: "Teabagging",
      imagePath: "/interests/teabagging.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "Teabagging is a sexual practice in which a man places his scrotum in the mouth or on the face of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "Teabagging is a sexual practice in which a man places his scrotum in the mouth or on the face of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
    {
      translationKey: defineMessage({ defaultMessage: "Titjob" }).id,
      defaultMessage: "Titjob",
      imagePath: "/interests/titjob.png",
      descriptionTranslationKey: defineMessage({
        defaultMessage:
          "A titjob, also known as a breast job or a boob job, is a sexual practice in which a person uses their breasts to stimulate the genital area of a sexual partner.",
      }).id,
      descriptionDefaultMessage:
        "A titjob, also known as a breast job or a boob job, is a sexual practice in which a person uses their breasts to stimulate the genital area of a sexual partner.",

      tags: {
        connectOrCreate: [
          {
            where: { translationKey: tags.practice.translationKey },
            create: tags.practice,
          },
        ],
      },
    },
  ];

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
