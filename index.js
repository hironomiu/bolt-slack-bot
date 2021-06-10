import pkg from "@slack/bolt"
import schedule from "node-schedule"
import axios from "axios"
import qs from "qs"
import dotenv from "dotenv"
import { restaurants } from "./data.js"
const { App } = pkg
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
  console.log("Bolt Slack Bot App is running!")
})()

const getRandomNum = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const createBlocks = () => {
  const restaurant = restaurants[getRandomNum(restaurants.length)]
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:shallow_pan_of_food:<今日は${restaurant.url}|${restaurant.name}>がおすすめ！？`,
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
          action_id: "find_another",
          text: {
            type: "plain_text",
            text: "他のお店をみる",
          },
        },
      ],
    },
  ]
  return blocks
}

app.message("fuga", async ({ message, say }) => {
  await say(`fuga ${message.user}`)
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
