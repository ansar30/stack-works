declare module "next" {
  export interface Metadata {
    title?: any;
    description?: string;
    keywords?: string[];
    authors?: any[];
    openGraph?: any;
    twitter?: any;
    robots?: any;
  }
  export interface NextConfig {
    [key: string]: any;
  }
  export namespace MetadataRoute {
    export type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
    }>;
    export type Robots = {
      rules: {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      };
      sitemap?: string | string[];
      host?: string;
    };
  }
}

declare module "next/types.js" {
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
}

declare module "next/server.js" {
  export class NextRequest extends Request {
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
    };
  }
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    cookies: {
      set(options: {
        name: string;
        value: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "lax" | "strict" | "none";
        path?: string;
        maxAge?: number;
        expires?: Date;
      }): void;
    };
  }
}

declare module "next/headers" {
  export function cookies(): Promise<{
    get(name: string): { name: string; value: string } | undefined;
  }>;
}

declare module "next/link" {
  import React from "react";
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
  const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  export default Link;
}

declare module "next/navigation" {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
  export function notFound(): never;
  export function redirect(url: string): never;
}

declare module "next/font/google" {
  export function Geist(options?: any): any;
  export function Geist_Mono(options?: any): any;
  export function Inter(options?: any): any;
}

declare module "next/server" {
  export class NextRequest extends Request {
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
    };
  }
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    cookies: {
      set(options: {
        name: string;
        value: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "lax" | "strict" | "none";
        path?: string;
        maxAge?: number;
        expires?: Date;
      }): void;
    };
  }
}
