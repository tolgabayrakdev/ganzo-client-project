import { Box, Button, Card, Container, Input, List, NumberInput, Paper, Text } from "@mantine/core"
import { useState } from "react"
import { IMaskInput } from "react-imask"

type Props = {}

export default function Index({ }: Props) {
  const [loading, setLoading] = useState(false);
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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text c="blue" fw="500">Harcama Formu: </Text>
        <Box mt="md">
          <form>
            <Input.Wrapper label="Müşteri Telefon No">
              <Input component={IMaskInput} mask="+90 (000) 000-00-00" placeholder="0532 111 11 11" />
            </Input.Wrapper>
            <NumberInput
              mt="xs"
              label="Alışveriş Tutarı"
              placeholder="Türk Lirası"
              prefix="₺"
              mb="md"
            />
            <Button loading={loading} variant="filled">Kaydet</Button>
          </form>
        </Box>


      </Paper>

    </Container>

  )
}