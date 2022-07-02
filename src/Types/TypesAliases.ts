import { ButtonHTMLAttributes, Dispatch, MouseEvent, SetStateAction, ChangeEvent as NativeChangeEvent } from "react"

export type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export type InputButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ButtonTypes = "button" | "submit" | "reset" | undefined

export type ChangeEvent = NativeChangeEvent<HTMLInputElement>

export type ChangeEventFieldSet = NativeChangeEvent<HTMLFieldSetElement>

export type ChangeEventSelect = NativeChangeEvent<HTMLSelectElement>

export type ClickEvent = MouseEvent<HTMLDataListElement>

export type SubmitHandler = React.FormEventHandler<HTMLFormElement>

export type SetAction<T> = Dispatch<SetStateAction<T>>

export type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>