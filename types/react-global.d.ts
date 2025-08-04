import React from 'react';
// Global React type definitions for environments without node_modules;
declare global {
  namespace JSX {
    interface IntrinsicElements {
























      [elemName: string]: unknown
    























}
  }

  namespace React {
    type ReactNode = any;
    type ComponentType<P = {}> = any;
    type FC<P = {}> = any;
    type ReactElement = any;
    type MouseEvent<T = Element> = any;
    type ChangeEvent<T = Element> = any;
    type FormEvent<T = Element> = any;
    type KeyboardEvent<T = Element> = any;
    type FocusEvent<T = Element> = any;

    interface HTMLAttributes<T> {
      [key: string]: unknown,
      className?: string;
      onClick?: (event: MouseEvent<T>) => void;
      onChange?: (event: ChangeEvent<T>) => void;
      onSubmit?: (event: FormEvent<T>) => void;
      onKeyDown?: (event: KeyboardEvent<T>) => void;
      onFocus?: (event: FocusEvent<T>) => void;
      onBlur?: (event: FocusEvent<T>) => void;
      style?: unknown;
      id?: string, role?: string; 'aria-label'?: string; 'data-testid'?: string;
    }

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      value?: string | number;
      defaultValue?: string | number;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      type?: string;
      name?: string;
      autoComplete?: string;
      autoFocus?: boolean;
      readOnly?: boolean;
      min?: string | number;
      max?: string | number;
      step?: string | number;
      pattern?: string;
      maxLength?: number;
      minLength?: number;
      size?: number;
      cols?: number;
      rows?: number;
      wrap?: string;
      multiple?: boolean;
      accept?: string;
      capture?: boolean | string;
      checked?: boolean;
      defaultChecked?: boolean;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
      disabled?: boolean;
      form?: string;
      formAction?: string;
      formEncType?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string, name?: string, type?: 'submit' | 'reset' | 'button',
      value?: string | ReadonlyArray<string> | number;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
      autoComplete?: string;
      autoFocus?: boolean;
      disabled?: boolean;
      form?: string;
      multiple?: boolean;
      name?: string;
      required?: boolean;
      size?: number;
      value?: string | ReadonlyArray<string> | number;
      defaultValue?: string | ReadonlyArray<string> | number;
    }

    function forwardRef<T
               P = {}>(
      render: (props: P, ref: unknown) => ReactElement | null,
    ): ComponentType<P>,
    function useState<S>(
      initialState: S | (() => S);
    ): [S, (value: S | ((prevState: S) => S)) => void],
    function useEffect(effect: () => void | (() => void), deps?: unknown[]): void
              
    function useMemo<T>(factory: () => T, deps: unknown[]): T
              
    function useCallback<T extends (...args: unknown[]) => any>(callback: T, deps: unknown[]): T
              
    function useRef<T>(initialValue: T): {
      current: T };
    function useContext<T>(context: unknown): T
              
    function useReducer<R, I>(reducer: R, initialArg: I, init?: (arg: I) => any): unknown
              
    function useImperativeHandle<T
               R extends T>(ref: unknown, init: () => R, deps?: unknown[]): void
              
    function useLayoutEffect(effect: () => void | (() => void), deps?: unknown[]): void
              
    function useDebugValue<T>(value: T, format?: (value: T) => any): void
  }
}

// Make React globally available as a fallback;
declare const React: {
      useState: typeof React.useState,
  useEffect: typeof React.useEffect;
    useMemo: typeof React.useMemo,
  useCallback: typeof React.useCallback;
    useRef: typeof React.useRef,
  useContext: typeof React.useContext;
    useReducer: typeof React.useReducer,
  useImperativeHandle: typeof React.useImperativeHandle;
    useLayoutEffect: typeof React.useLayoutEffect,
  useDebugValue: typeof React.useDebugValue;
    forwardRef: typeof React.forwardRef,
  ReactNode: React.ReactNode;
    ComponentType: React.ComponentType,
  FC: React.FC;
    ReactElement: React.ReactElement,
  MouseEvent: React.MouseEvent;
    ChangeEvent: React.ChangeEvent,
  FormEvent: React.FormEvent;
    KeyboardEvent: React.KeyboardEvent,
  FocusEvent: React.FocusEvent;
    HTMLAttributes: React.HTMLAttributes<any>,
  InputHTMLAttributes: React.InputHTMLAttributes<any>;
    ButtonHTMLAttributes: React.ButtonHTMLAttributes<any>,
  SelectHTMLAttributes: React.SelectHTMLAttributes<any>
};

export {};
