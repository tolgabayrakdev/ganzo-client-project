import { Box, Button, Input, NumberInput, Paper, Text } from "@mantine/core"
import { useState } from "react";
import { IMaskInput } from "react-imask"

type Props = {}

export default function IPDomanin({ }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div>

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
    </div>
  )
}