import { defineMessage } from "../i18n";
import { prisma } from "../prisma";
import { tags } from "./tags";

export async function upsertInterests() {
  const interests = [
    {
      defaultMessage: defineMessage({ defaultMessage: "Anilingus" })
        .defaultMessage,
      imagePath: "/interests/analingus.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          'Anilingus, also known as "rimming" or "tongue-fucking," is a sexual activity that involves the use of the mouth, tongue, and lips to stimulate the anus of a sexual partner.',
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Analsex" })
        .defaultMessage,
      imagePath: "/interests/analsex.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Anal sex is a sexual activity that involves the insertion of a penis, finger, or other object into the anus of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Bukkake" })
        .defaultMessage,
      imagePath: "/interests/bukkake.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Bukkake is a sexual practice in which a group of men ejaculate on the face or body of a woman or man.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Cumshot" })
        .defaultMessage,
      imagePath: "/interests/cumshot.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          'A cumshot, also known as a "money shot," is a term that is used in pornography to refer to the scene in which a man ejaculates, typically on the face or body of a female sexual partner.',
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Cunnilingus" })
        .defaultMessage,
      imagePath: "/interests/cunnilingus.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Cunnilingus is a sexual practice in which a person uses their mouth, tongue, and lips to stimulate the genital area of a female sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Deepthroating" })
        .defaultMessage,
      imagePath: "/interests/deepthroating.svg",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Deepthroating is a sexual practice in which a person takes a penis or other object into their mouth and throat.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Double-penetration" })
        .defaultMessage,
      imagePath: "/interests/doublepenetration.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          'Double-penetration, also known as "DP," is a sexual practice in which a person is simultaneously penetrated by two objects, typically two penises or a penis and a sex toy.',
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Facesitting" })
        .defaultMessage,
      imagePath: "/interests/facesitting.jpg",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Facesitting is a sexual practice in which one person sits on or over the face of another person, typically for the purpose of oral-genital or oral-anal stimulation.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Facial" })
        .defaultMessage,
      imagePath: "/interests/facial.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "A facial is a sexual practice in which a man ejaculates on the face of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Blowjob" })
        .defaultMessage,
      imagePath: "/interests/fellatio.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "A blowjob, also known as oral sex or fellatio, is a sexual practice in which a person uses their mouth, lips, and tongue to stimulate the penis of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Fingering" })
        .defaultMessage,
      imagePath: "/interests/fingering.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Fingering is a sexual practice in which a person uses their fingers to stimulate the genital area of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Fisting" })
        .defaultMessage,
      imagePath: "/interests/fisting.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Fisting is a sexual practice in which a person inserts their entire hand into the vagina or anus of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Footjob" })
        .defaultMessage,
      imagePath: "/interests/footjob.jpg",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "A footjob is a sexual practice in which a person uses their feet to stimulate the genital area of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Group sex" })
        .defaultMessage,
      imagePath: "/interests/groupsex.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Group sex is a sexual activity that involves more than two people engaging in sexual activity together. There are many different forms of group sex, including threesomes, foursomes, orgies, and more.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Pegging" })
        .defaultMessage,
      imagePath: "/interests/pegging.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Pegging is a sexual practice in which a woman uses a strap-on dildo to penetrate the anus of a man.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Public sex" })
        .defaultMessage,
      imagePath: "/interests/publicsex.jpg",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Public sex is a sexual activity that takes place in a public place, where it may be visible to others.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Teabagging" })
        .defaultMessage,
      imagePath: "/interests/teabagging.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "Teabagging is a sexual practice in which a man places his scrotum in the mouth or on the face of a sexual partner.",
      }).defaultMessage,

      tags: [tags.practice],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Titjob" })
        .defaultMessage,
      imagePath: "/interests/titjob.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage:
          "A titjob, also known as a breast job or a boob job, is a sexual practice in which a person uses their breasts to stimulate the genital area of a sexual partner.",
      }).defaultMessage,

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
