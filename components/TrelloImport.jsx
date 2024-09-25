import React, { useCallback, useEffect, useState } from 'react'
import { Card, Button, Text } from '@sanity/ui'
import { ArchiveIcon, ResetIcon } from '@sanity/icons'
import { useClient } from 'sanity'

const MessageLog = (props) => {
  const { messages } = props
  return (
    <Card style={{display: 'flex', flexDirection: 'column', gap: 6}}>
      {messages.map((entry, index) => (
        <Text key={index} style={{color:(entry.type === 'success' ? 'green' : entry.type === 'warning' ? 'red' : 'white')}}>
          {entry.time}
          {entry.msg}
        </Text>
      ))}
    </Card>
  )
}

const TrelloImportComponent = (props) => {
  const client = useClient({apiVersion: '2021-06-07'})
  const [ sanityData, setSanityData ] = useState(null)
  const [ trelloData, setTrelloData ] = useState(null)
  const [ log, setLog ] = useState([])
  const [ hold, setHold ] = useState(true)
  const [ isFetching, setFetching ] = useState(false)

  const updateLog = useCallback((msg = "", type = "normal") => {
    const date = new Date()
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} `
    setLog(old => [...old, {time, type, msg}])
  }, [])

  const sanityFetch = useCallback(async () => {
    const result = await client.fetch(`*[_type == "lunchDishes"] {title}`)
    updateLog(`Fetched ${result.length} results`)
    setSanityData(result)
    setFetching(false)
  }, [client, updateLog])

  const sanityPost = async () => {
    // lag func for bilde? url --> file --> upload
    // https://www.sanity.io/docs/js-client#creating-documents

    const doc = {
      _type: 'lunchDishes',
      title: 'trelloimportcomponent ' + new Date(),
      allergens: '',
      date: new Date()
      // image: ''
    }

    client.create(doc).then((res)=>{
      updateLog(`Created entry: ${res.title} `)
    })
  }


  const update = async () => {
    setHold(false)
  }

  const reset = () => {
    setHold(true)
    setLog([])
    setSanityData(null)
    setTrelloData(null)
  }

  useEffect(() => {
    if (hold) return

    if (!sanityData) {
      if (isFetching) return
      setFetching(true)
      updateLog("Fetching recently created lunch dishes from https://trello.com/")
      sanityFetch()
    }
  }, [hold, isFetching, sanityData, sanityFetch, updateLog])

  return (
    <Card padding={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap:8}}>
      <MessageLog messages={log}/>
      {log.length > 0 ?
        <Button
          onClick={reset}
          fontSize={[2, 2, 3]}
          icon={ResetIcon}
          mode="ghost"
          padding={[3, 3, 4]}
          text="Clear log"
        />
      :
        <Button
          onClick={update}
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