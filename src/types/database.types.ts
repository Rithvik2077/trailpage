export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Category: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          created_by: number | null
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id: number
          title?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Role: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      SubCategory: {
        Row: {
          category_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          category_id?: number | null
          id: number
          name?: string | null
        }
        Update: {
          category_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SubCategory_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
        ]
      }
      Survey: {
        Row: {
          closes_at: string | null
          created_at: string | null
          created_by: number | null
          id: number
          survey_fields: Json | null
          title: string | null
        }
        Insert: {
          closes_at?: string | null
          created_at?: string | null
          created_by?: number | null
          id: number
          survey_fields?: Json | null
          title?: string | null
        }
        Update: {
          closes_at?: string | null
          created_at?: string | null
          created_by?: number | null
          id?: number
          survey_fields?: Json | null
          title?: string | null
        }
        Relationships: []
      }
      SurveyResponses: {
        Row: {
          created_at: string | null
          id: number
          response_data: Json | null
          survey_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id: number
          response_data?: Json | null
          survey_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          response_data?: Json | null
          survey_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "SurveyResponses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "Survey"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SurveyResponses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Ticket: {
        Row: {
          assigned_to: number | null
          closed_at: string | null
          closed_by: number | null
          created_at: string | null
          created_by: number | null
          description: string | null
          id: number
          priority: string | null
          status: string | null
          sub_category_id: number | null
          title: string | null
        }
        Insert: {
          assigned_to?: number | null
          closed_at?: string | null
          closed_by?: number | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id: number
          priority?: string | null
          status?: string | null
          sub_category_id?: number | null
          title?: string | null
        }
        Update: {
          assigned_to?: number | null
          closed_at?: string | null
          closed_by?: number | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number
          priority?: string | null
          status?: string | null
          sub_category_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Ticket_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Ticket_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Ticket_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "SubCategory"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          email: string
          id: number
          is_active: boolean
          password: string | null
          updated_at: string | null
          user_name: string | null
        }
        Insert: {
          email: string
          id?: number
          is_active?: boolean
          password?: string | null
          updated_at?: string | null
          user_name?: string | null
        }
        Update: {
          email?: string
          id?: number
          is_active?: boolean
          password?: string | null
          updated_at?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      UserRoleMapping: {
        Row: {
          can_create_survey: boolean | null
          group_id: number | null
          id: number
          role_id: number | null
          sub_category_id: number | null
          user_id: number | null
        }
        Insert: {
          can_create_survey?: boolean | null
          group_id?: number | null
          id: number
          role_id?: number | null
          sub_category_id?: number | null
          user_id?: number | null
        }
        Update: {
          can_create_survey?: boolean | null
          group_id?: number | null
          id?: number
          role_id?: number | null
          sub_category_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "UserRoleMapping_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserRoleMapping_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserRoleMapping_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "SubCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserRoleMapping_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
