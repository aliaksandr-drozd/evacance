import React, { FC } from 'react'
import { Card, FloatingPanel, Form, Slider } from 'antd-mobile'
import { Trans, useTranslation } from 'react-i18next'


export interface IPickRouteDeviationProps {
  onToleranceChange: (tolerance: number) => void
  tolerance: number
}

export const PickRouteDeviation: FC<IPickRouteDeviationProps> = ({
  onToleranceChange,
  tolerance,
}) => {
  const { t } = useTranslation()

  return (
    <FloatingPanel
      anchors={ [200, 200] }
      handleDraggingOfContent={ false }
    >
      <Form>
        <Form.Header>
          <Trans
            i18nKey="driverRouteDeviation"
            values={{ deviation: tolerance }}
          />
        </Form.Header>

        <Slider
          min={ 10 }
          max={ 200 }
          defaultValue={ tolerance }
          // @ts-ignore
          onAfterChange={ onToleranceChange }
        />
      </Form>

      <Card>
        { t('mapUsage') }
      </Card>
    </FloatingPanel>
  )
}
