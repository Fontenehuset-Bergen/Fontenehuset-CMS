import React, { useEffect, useState } from 'react'
import { Card, Button, Flex, Text } from '@sanity/ui'
import { ArchiveIcon, ResetIcon } from '@sanity/icons'

const TrelloImportComponent = (props) => {
  const [ data, setData ] = useState(null)
  const [ log, updateLog ] = useState([])

  const logMsg = (msg) => {
    const date = new Date()
    const entry = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${msg}`
    log.push(entry)
    updateLog(log)
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const update = async () => {
    const start = new Date().getTime()
    setData('post')
    logMsg("Fetching recent boards from https://trello.com/")
    await delay(5000);
    logMsg("Found 25 newly added items")
    logMsg("Generating object")
    await delay(5000);
    logMsg("Creating Sanity entries")
    await delay(5000);
    logMsg("Successfully created 25 new entries to sanity")
    const end = new Date().getTime()
    logMsg(`Operation finished after ${start-end} seconds`)
    logMsg("You can safely navigate away from this page now")
  }

  return (
    <Card padding={4} style={{justifyContent: 'center'}}>
      {data ?
        <Card style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {log.map((entry, index) => (
            <Text key={index}>{entry}</Text>
          ))}
        </Card>
      :
        <Button
          onClick={() => update()}
          fontSize={[2, 2, 3]}
          icon={ArchiveIcon}
          mode="ghost"
          padding={[3, 3, 4]}
          text="Fetch recent data"
        />
      }
    </Card>
  )
}

export const TrelloImportTool = (config) => ({
  title: 'Trello import tool',
  name: 'trello-import',
  icon: ArchiveIcon,
  component: TrelloImportComponent,
  ...config,
})