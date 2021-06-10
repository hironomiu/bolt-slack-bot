const { App } = require("@slack/bolt")
const schedule = require("node-schedule")
const axios = require("axios")
const qs = require("qs")
const dotenv = require("dotenv")
dotenv.config({ path: "./.env.local" })

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_BOT_SIGNING_SECRET,
})

;(async () => {
  await app
    .start(process.env.PORT || 3000)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      consol.log(error)
    })
  console.log("Bolt lunch app is running!")
})()

const getRandomNum = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const restaurants = [
  {
    name: "春秋ユラリ 恵比寿",
    url: "https://tabelog.com/tokyo/A1303/A130302/13051136/",
  },
  {
    name: "皇綱家",
    url: "https://tabelog.com/tokyo/A1305/A130501/13253828/",
  },
]

const createBlocks = () => {
  const restaurant = restaurants[getRandomNum(restaurants.length)]
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:shallow_pan_of_food:<${restaurant.url}|${restaurant.name}>はいかかですか？`,
      },
      accessory: {
        type: "button",
        action_id: "find_another",
        text: {
          type: "plain_text",
          text: "他の店をみる",
        },
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "他のお店をみる",
          },
          action_id: "find_another",
        },
      ],
    },
  ]
  return blocks
}

app.message("hello", async ({ message, say }) => {
  await say(`hello ${message.user}`)
})

app.command("/lunch", async ({ ack, respond }) => {
  await ack()
  const blocks = createBlocks()
  await respond({
    response_type: "in_channel",
    blocks: blocks,
  })
})

app.action("find_another", async ({ ack, respond }) => {
  await ack()
  const blocks = createBlocks()
  await respond({
    response_type: "in_channel",
    replace_original: true,
    blocks: blocks,
  })
})

schedule.scheduleJob({ hour: 19, minute: 0 }, () => {
  console.log("hoge")
  const body = {
    token: process.env.SLACK_BOT_TOKEN,
    channel: "dev",
    text: "今日のおすすめ",
    blocks: JSON.stringify(createBlocks()),
  }
  console.log(body)
  axios
    .post("https://slack.com/api/chat.postMessage", qs.stringify(body))
    .then((response) => {
      console.log(response)
    })
})
