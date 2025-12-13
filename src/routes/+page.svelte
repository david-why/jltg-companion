<script lang="ts">
  import { Row, Col, Card, CardBody, CardTitle, CardText } from '@sveltestrap/sveltestrap'

  import { resolve } from '$app/paths'
</script>

<h1>JLTG Companion</h1>

<p>Supercharge your JLTG Hide &amp; Seek game</p>

<h2 class="fs-4 pb-2">Which side are you playing on?</h2>

<Row>
  <Col>
    <a href={resolve('/hiders')}>
      <Card style="height: 100%">
        <CardBody>
          <CardTitle>Hiders</CardTitle>
          <CardText>Track the deck, your cards, and the current time</CardText>
        </CardBody>
      </Card>
    </a>
  </Col>
  <Col>
    <a href={resolve('/seekers')}>
      <Card style="height: 100%">
        <CardBody>
          <CardTitle>Seekers</CardTitle>
          <CardText>See the map and track the questions you've asked</CardText>
        </CardBody>
      </Card>
    </a>
  </Col>
</Row>
