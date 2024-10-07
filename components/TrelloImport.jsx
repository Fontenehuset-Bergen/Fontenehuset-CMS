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
  const [ sanityData, setSanityData ] = useState(null)
  const [ trelloData, setTrelloData ] = useState(null)
  const [ log, setLog ] = useState([])
  const [ hold, setHold ] = useState(true)
  const [ isFetchingSanity, setFetchingSanity ] = useState(false)
  const [ isFetchingTrello, setFetchingTrello ] = useState(false)
  const { trelloApiKey, trelloToken, trelloBoardId } = props.tool
  const client = useClient({apiVersion: '2021-06-07'})

  const updateLog = useCallback((msg = "", type = "normal") => {
    const date = new Date()
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} `
    setLog(old => [...old, {time, type, msg}])
  }, [])

  const trelloFetch = useCallback(async () => {
    try {
      // Trellofilter should contain logic for fetching data ahead of call. Question is; how should we fetch data?
      // - Fetch all data, ahead of current time.
      // - All data around date in n-weeks range
      // - All data in trello, then remove dups with data from sanity
      // Another question is; should this fn update existing, if value in trello is dif, indicating change in trello from last fetch. (updates etc)
      // We could use trello's id val for this

      const result = await fetch(`https://api.trello.com/1/boards/${trelloBoardId}/cards?fields=id,name,due,desc,labels,cover&key=${trelloApiKey}&token=${trelloToken}`, { method: 'GET' })
      const data = await result.json()
      updateLog(`Fetched ${data.length} results from Trello`)
      setTrelloData(data)
      setFetchingSanity(false)

      // for fun :'>
      for (let item of data) {
        setTimeout(() => {
          updateLog(`Added: ${item.name}`)
        }, 250)
      }

    } catch (err) {
      console.log(err.message)
    }
  }, [trelloApiKey, trelloBoardId, trelloToken, updateLog])

  const sanityFetch = useCallback(async () => {
    const result = await client.fetch(`*[_type == "lunchDishes"] {title}`)
    updateLog(`Fetched ${result.length} results from Sanity`)
    setSanityData(result)
    setFetchingSanity(false)
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
      if (isFetchingSanity) return
      setFetchingSanity(true)
      sanityFetch()
    }

    if (!trelloData) {
      if (isFetchingTrello) return
      setFetchingTrello(true)
      updateLog("Fetching recently created lunch dishes from https://trello.com/")
      trelloFetch()
    }
  }, [hold, isFetchingSanity, sanityData, isFetchingTrello, trelloData, sanityFetch, trelloFetch, updateLog])

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