import React, { FC } from 'react'
import { Button, Form, Selector, Stepper, Switch, TextArea, Radio, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationRequestForm } from '../../../../common/interfaces'
import { BaggageOption } from '../../../../common/enums'
import { LOCALE_MAP } from '../../../../common/components'
import styles from './styles.module.less'


export interface IFormProps {
  isSubmitAvailable: boolean
  onSubmit: (data: IEvacuationRequestForm) => void
  onCancel: () => void
}

export const FormComponent: FC<IFormProps> = ({
  isSubmitAvailable,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation()

  return (
    <div className={ styles.wrapper }>
      <Form
        onFinish={ onSubmit }
        footer={
          <Space
            block
            direction="vertical"
          >
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              loading={ !isSubmitAvailable }
            >
              { t('requestAdd') }
            </Button>
            <Button
              block
              onClick={ onCancel }
              color="danger"
              size="large"
              loading={ !isSubmitAvailable }
            >
              { t('cancel') }
            </Button>
          </Space>
        }
      >
        <Form.Header>{ t('requestAdd') }</Form.Header>
        <Form.Item
          name="languages"
          label={ t('myLanguages') }
          initialValue={ ['uk'] }
        >
          <Selector
            multiple={ true }
            options={ Object.entries(LOCALE_MAP).map(([value, label]) => ({ label, value })) }
          />
        </Form.Item>
        <Form.Item
          name="peopleCount"
          label={ t('peopleCountRefugee') }
          initialValue={ 1 }
        >
          <Stepper min={ 0 } />
        </Form.Item>
        <Form.Item
          name="withPets"
          label={ t('withPetsRefugee') }
          initialValue={ false }
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="withBaggage"
          label={ t('withBaggageRefugee') }
          initialValue={ BaggageOption.SMALL_CAR }
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={ BaggageOption.SMALL_CAR }>{ t('withBaggageRefugeeOption1') }</Radio>
              <Radio value={ BaggageOption.BIG_CAR }>{ t('withBaggageRefugeeOption2') }</Radio>
              <Radio value={ BaggageOption.TRUCK }>{ t('withBaggageRefugeeOption3') }</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="contactData"
          label={ t('contactData') }
          initialValue=""
          rules={[{ required: true, message: t('fieldCannotBeEmpty') }]}
        >
          <TextArea
            placeholder={ t('contactDataPlaceholder') }
            rows={ 4 }
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export { FormComponent as Form }
