import { defineMessage } from "../i18n";
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

    {
      defaultMessage: defineMessage({
        defaultMessage: "A Position With A View",
      }).defaultMessage,
      imagePath: "/positions/apositionwithaview.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "A Position With A View",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Arrousing Accordion" })
        .defaultMessage,
      imagePath: "/positions/arrousingaccordion.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Arrousing Accordion",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "A Tight Fit" })
        .defaultMessage,
      imagePath: "/positions/atightfit.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "A Tight Fit",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Black Swan" })
        .defaultMessage,
      imagePath: "/positions/blackswan.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Black Swan" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Bottoms Up" })
        .defaultMessage,
      imagePath: "/positions/bottomsup.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Bottoms Up" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Bottoms Up Reversed" })
        .defaultMessage,
      imagePath: "/positions/bottomsup2.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Bottoms Up Reversed",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Bucking Bronto" })
        .defaultMessage,
      imagePath: "/positions/buckingbronto.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Bucking Bronto",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Comfort Screw" })
        .defaultMessage,
      imagePath: "/positions/comfortscrew.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Comfort Screw",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Couch Calypso" })
        .defaultMessage,
      imagePath: "/positions/couchcalypso.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Couch Calypso",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Couch Tango" })
        .defaultMessage,
      imagePath: "/positions/couchtangle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Couch Tango",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Countertop Climax" })
        .defaultMessage,
      imagePath: "/positions/countertopclimax.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Countertop Climax",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Crafty Cat" })
        .defaultMessage,
      imagePath: "/positions/craftycat.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Crafty Cat" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Criss Cross" })
        .defaultMessage,
      imagePath: "/positions/crisscross.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Criss Cross",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Doggy" }).defaultMessage,
      imagePath: "/positions/doggy.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Doggy" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Doggy Mod" })
        .defaultMessage,
      imagePath: "/positions/dogmod.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Doggy Mod" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Downward Dog" })
        .defaultMessage,
      imagePath: "/positions/downwarddog.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Downward Dog",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Dragon Within" })
        .defaultMessage,
      imagePath: "/positions/dragonwithin.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Dragon Within",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Fast Spin Cycle" })
        .defaultMessage,
      imagePath: "/positions/fastspincycle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Fast Spin Cycle",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Full Frontal" })
        .defaultMessage,
      imagePath: "/positions/fullfrontal.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Full Frontal",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Gardeners Dream" })
        .defaultMessage,
      imagePath: "/positions/gardenersdream.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Gardeners Dream",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Gear Shift Position" })
        .defaultMessage,
      imagePath: "/positions/gearshiftposition.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Gear Shift Position",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "G Spot Geronimo" })
        .defaultMessage,
      imagePath: "/positions/gspotgeronimo.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "G Spot Geronimo",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "G Spot Wiggle" })
        .defaultMessage,
      imagePath: "/positions/gspotwiggle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "G Spot Wiggle",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Guy Pleaser" })
        .defaultMessage,
      imagePath: "/positions/guypleaser.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Guy Pleaser",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Hogwarts Express" })
        .defaultMessage,
      imagePath: "/positions/hogwartsexpress.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Hogwarts Express",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Incy Wincy Spider" })
        .defaultMessage,
      imagePath: "/positions/incywincyspider.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Incy Wincy Spider",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Just Hanging About" })
        .defaultMessage,
      imagePath: "/positions/justhangingabout.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Just Hanging About",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({
        defaultMessage: "Keeping Ahead of the Game",
      }).defaultMessage,
      imagePath: "/positions/keepingaheadofthegame.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Keeping Ahead of the Game",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Lap Dance" })
        .defaultMessage,
      imagePath: "/positions/lapdance.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Lap Dance" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Lap Dance Legs Up" })
        .defaultMessage,
      imagePath: "/positions/lapdance2.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Lap Dance Legs Up",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Lap Dog" })
        .defaultMessage,
      imagePath: "/positions/lapdog.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Lap Dog" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Lean back and take it" })
        .defaultMessage,
      imagePath: "/positions/leanbackandtakeit.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Lean back and take it",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Lean on your side" })
        .defaultMessage,
      imagePath: "/positions/leanonyourside.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Lean on your side",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Madame Butterfly" })
        .defaultMessage,
      imagePath: "/positions/madamebutterfly.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Madame Butterfly",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Magic M" })
        .defaultMessage,
      imagePath: "/positions/magicm.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Magic M" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Missionary" })
        .defaultMessage,
      imagePath: "/positions/missionary.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Missionary" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Missionary Switchup" })
        .defaultMessage,
      imagePath: "/positions/missionaryswitchup.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Missionary Switchup",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Mountain Posture" })
        .defaultMessage,
      imagePath: "/positions/mountainposture.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Mountain Posture",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Namaste" })
        .defaultMessage,
      imagePath: "/positions/namaste.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Namaste" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Noodle Canoodle" })
        .defaultMessage,
      imagePath: "/positions/noodlecanoodle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Noodle Canoodle",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Oh My God Position" })
        .defaultMessage,
      imagePath: "/positions/ohmygodposition.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Oh My God Position",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Partisan Fold" })
        .defaultMessage,
      imagePath: "/positions/partisanfold.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Partisan Fold",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Reverse Handstand" })
        .defaultMessage,
      imagePath: "/positions/reversehandstand.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Reverse Handstand",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Ride 'Em Cowgirl" })
        .defaultMessage,
      imagePath: "/positions/rideemcowgirl.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Ride 'Em Cowgirl",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Rock 'n' Roller" })
        .defaultMessage,
      imagePath: "/positions/rocknroller.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Rock 'n' Roller",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({
        defaultMessage: "Roller Coaster Madness",
      }).defaultMessage,
      imagePath: "/positions/rollercoastermadness.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Roller Coaster Madness",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Rolling Stones" })
        .defaultMessage,
      imagePath: "/positions/rollingstones.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Rolling Stones",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Sauce Samba" })
        .defaultMessage,
      imagePath: "/positions/saucesamba.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Sauce Samba",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "See Saw" })
        .defaultMessage,
      imagePath: "/positions/seesaw.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "See Saw" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Sensual Scissors" })
        .defaultMessage,
      imagePath: "/positions/sensualscissors.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Sensual Scissors",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Sex with a View" })
        .defaultMessage,
      imagePath: "/positions/sexwithaview.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Sex with a View",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Side Saddle" })
        .defaultMessage,
      imagePath: "/positions/sidesaddle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Side Saddle",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Snake Charmer" })
        .defaultMessage,
      imagePath: "/positions/snakecharmer.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Snake Charmer",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Space Hopper" })
        .defaultMessage,
      imagePath: "/positions/spacehopper.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Space Hopper",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Space Hopper Reverse" })
        .defaultMessage,
      imagePath: "/positions/spacehopperreverse.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Space Hopper Reverse",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Spoons" })
        .defaultMessage,
      imagePath: "/positions/spoons.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Spoons" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Spork Me" })
        .defaultMessage,
      imagePath: "/positions/sporkme.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Spork Me" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Stand to Attention" })
        .defaultMessage,
      imagePath: "/positions/standtoattention.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Stand to Attention",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Angel" })
        .defaultMessage,
      imagePath: "/positions/theangel.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "The Angel" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Bump and Grind" })
        .defaultMessage,
      imagePath: "/positions/thebumpandgrind.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Bump and Grind",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Contortionist" })
        .defaultMessage,
      imagePath: "/positions/thecontortionist.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Contortionist",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Helping Hand" })
        .defaultMessage,
      imagePath: "/positions/thehelpinghand.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Helping Hand",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Houdini" })
        .defaultMessage,
      imagePath: "/positions/thehoudini.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Houdini",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Master" })
        .defaultMessage,
      imagePath: "/positions/themaster.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "The Master" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Ooh La La" })
        .defaultMessage,
      imagePath: "/positions/theoohlala.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Ooh La La",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Pick Me Upper" })
        .defaultMessage,
      imagePath: "/positions/thepickmeupper.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "The Pick Me Upper",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "The Quicky" })
        .defaultMessage,
      imagePath: "/positions/thequicky.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "The Quicky" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Tickling Time Bomb" })
        .defaultMessage,
      imagePath: "/positions/tickingtimebomb.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Tickling Time Bomb",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Tingling Triangle" })
        .defaultMessage,
      imagePath: "/positions/tinglingtriangle.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Tingling Triangle",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Tug of War" })
        .defaultMessage,
      imagePath: "/positions/tugowar.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Tug of War" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Twisted Pretzel" })
        .defaultMessage,
      imagePath: "/positions/twistedpretzel.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Twisted Pretzel",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Upward Dog" })
        .defaultMessage,
      imagePath: "/positions/upwarddog.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Upward Dog" })
        .defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "V for Victory" })
        .defaultMessage,
      imagePath: "/positions/vforvictory.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "V for Victory",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Victory Position" })
        .defaultMessage,
      imagePath: "/positions/victoryposition.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Victory Position",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "X Marks the Spot" })
        .defaultMessage,
      imagePath: "/positions/xmarksthespot.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "X Marks the Spot",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Year of the Dragon" })
        .defaultMessage,
      imagePath: "/positions/yearofthedragon.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Year of the Dragon",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Yoga Master" })
        .defaultMessage,
      imagePath: "/positions/yogamaster.png",
      descriptionDefaultMessage: defineMessage({
        defaultMessage: "Yoga Master",
      }).defaultMessage,
      tags: [tags.position],
    },
    {
      defaultMessage: defineMessage({ defaultMessage: "Zen Garden" })
        .defaultMessage,
      imagePath: "/positions/zengarden.png",
      descriptionDefaultMessage: defineMessage({ defaultMessage: "Zen Garden" })
        .defaultMessage,
      tags: [tags.position],
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

  return interests;
}
