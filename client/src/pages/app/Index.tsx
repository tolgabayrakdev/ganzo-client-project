import { Card, Container, List } from "@mantine/core"
type Props = {}

export default function Index({ }: Props) {
  return (
    <Container>
      <Card mt="md" shadow="sm">
        <h3>Hoşgeldin, Tolga BAYRAK</h3>
        <List>
          <List.Item>Önce müşterini, Müşteriler sayfasından sisteme kayıt ettirebilirsin.</List.Item>
          <List.Item>Ardından bu sayfadan müşteri telefon numarası ile harcama girişini yapabilirsin.</List.Item>
          <List.Item>Müşterilerin için her alışverişden sonra kuponları ve puanları birikir.</List.Item>
          <List.Item>Ardından bu kuponları isterse kullarak indirim ve ayrıcaklar kazanabilir.</List.Item>
        </List>
      </Card>


    </Container>

  )
}