import React, { FC } from 'react'
import { Card, FloatingPanel, Form, Slider } from 'antd-mobile'
import { Trans, useTranslation } from 'react-i18next'


export interface IPickRadiusProps {
  onRadiusChange: (tolerance: number) => void
  radius: number
}

export const PickRadius: FC<IPickRadiusProps> = ({
  onRadiusChange,
  radius,
}) => {
  const { t } = useTranslation()

  return (
    <FloatingPanel
      anchors={ [150, 150] }
      handleDraggingOfContent={ false }
    >
      <Form>
        <Form.Header>
          <Trans
            i18nKey="noFurther"
            values={{ radius }}
          />
        </Form.Header>

        <Slider
          min={ 5 }
          max={ 500 }
          defaultValue={ radius }
          // @ts-ignore
          onAfterChange={ onRadiusChange }
        />
      </Form>

      <Card>
        { t('noFurtherLegend') }
      </Card>
    </FloatingPanel>
  )
}
